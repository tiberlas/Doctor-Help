package com.ftn.dr_help.service;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
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
	
	public AppointmentInternalBlessedDTO blessing(AppointmentForSchedulingDTO requested, String adminMeil) {
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
			appointment.setStatus(AppointmentStateEnum.APPROVED);
			appointment.setDeleted(false);
			
			appointmentRepository.save(appointment);
			return new AppointmentInternalBlessedDTO(AppointmentBlessing.BLESSED, "BLESSING RECIVED");
		} catch(Exception e) {
			return new AppointmentInternalBlessedDTO(AppointmentBlessing.REFFUSED, "NOT WORTHY");
		}
	}
}
