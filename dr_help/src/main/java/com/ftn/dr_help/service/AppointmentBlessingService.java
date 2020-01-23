package com.ftn.dr_help.service;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.comon.Mail;
import com.ftn.dr_help.dto.AppointmentForSchedulingDTO;
import com.ftn.dr_help.dto.AppointmentInternalBlessedDTO;
import com.ftn.dr_help.dto.NurseWIthFirstFreeDateInnerDTO;
import com.ftn.dr_help.model.enums.AppointmentBlessing;
import com.ftn.dr_help.model.enums.AppointmentStateEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;

@Service
public class AppointmentBlessingService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DateConverter dateConverter;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private NurseService nurseService;
	
	@Autowired
	private ProcedureTypeRepository procedureRepository;
	
	@Autowired
	private ClinicAdministratorRepository clinicAdminRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private Mail mailSender;
	
	public AppointmentInternalBlessedDTO blessing(AppointmentForSchedulingDTO requested, String adminMeil) {
		/**
		 * provera da li requested appointment odgovara sobi i doktoru; 
		 * dodeli medicinsku sestru appointmentu;
		 * ako je sve uredu stavi stanje appointmenta na BLESSED; a ako doktoru ili sobi ne odgovara termin
		 * vrati prvi slobdan termin koji im odgovara;
		 * takodje ako ni jedna medicinska sestra ne moze da prisustvuje za requested appointment onda se vrati priv slobodan termin
		 * 
		 * */
		try {
			
			Calendar date = dateConverter.stringToDate(requested.getDateAndTime());
			String dateString = dateConverter.dateForFrontEndString(date);
			
			RoomPOJO room = roomService.findOnePOJO(requested.getRoomId(), adminMeil);
			String freeRoom = roomService.findFirstFreeScheduleFromDate(room, date);
			
			if(!freeRoom.equals(dateString)) {
				return new AppointmentInternalBlessedDTO(AppointmentBlessing.BAD_DATE, freeRoom);
			}
			
			Calendar freeDoctor = doctorService.checkSchedue(requested.getDoctorEmail(), date);
			String freeDoctorString = dateConverter.dateForFrontEndString(freeDoctor);
			
			if(!freeDoctorString.equals(dateString)) {
				return new AppointmentInternalBlessedDTO(AppointmentBlessing.BAD_DOCTOR, freeDoctorString);
			}
			
			Calendar duration = Calendar.getInstance();
			duration.setTime(procedureRepository.getOne(requested.getProcedureId()).getDuration());
			Long clinicId = clinicAdminRepository.findOneByEmail(adminMeil).getClinic().getId();
			NurseWIthFirstFreeDateInnerDTO freeNurse = nurseService.findFreeNurse(date, duration, clinicId);
			
			if(!freeNurse.getFirstFreeDate().getTime().equals(date.getTime())) {
				String freeDateString = dateConverter.dateForFrontEndString(freeNurse.getFirstFreeDate());
				return new AppointmentInternalBlessedDTO(AppointmentBlessing.BAD_DATE, freeDateString);
			}

			DoctorPOJO doctor = doctorRepository.findOneByEmail(requested.getDoctorEmail());
			
			AppointmentPOJO appointment = appointmentRepository.getOne(requested.getAppointmentRequestedId());
			appointment.setDate(date);
			appointment.setDoctor(doctor);
			appointment.setNurse(freeNurse.getNurse());
			appointment.setRoom(room);
			appointment.setDeleted(false);
			if(appointment.getStatus() == AppointmentStateEnum.REQUESTED) {
				//pacijent je trazio pregled, pa pitamo da li njemu odgovara
				appointment.setStatus(AppointmentStateEnum.BLESSED);
				
				mailSender.sendAppointmentBlessedEmail(appointment);
			} else {
				//doktor je trazio pregled pa ih obavestavamo o ishodu
				appointment.setStatus(AppointmentStateEnum.APPROVED);
				
				mailSender.sendAppointmentApprovedToDoctorEmail(appointment);
				mailSender.sendAppointmentApprovedToNurseEmail(appointment);
				mailSender.sendAppointmentApprovedToPatientEmail(appointment);
			}			
			appointmentRepository.save(appointment);
			
			return new AppointmentInternalBlessedDTO(AppointmentBlessing.BLESSED, "BLESSING RECIVED");
		} catch(Exception e) {
			e.printStackTrace();
			return new AppointmentInternalBlessedDTO(AppointmentBlessing.REFFUSED, "NOT WORTHY");
		}
	}
}
