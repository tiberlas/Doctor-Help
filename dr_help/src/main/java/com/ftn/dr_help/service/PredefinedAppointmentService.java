package com.ftn.dr_help.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.PredefinedAppointmentDTO;
import com.ftn.dr_help.model.enums.AppointmentStateEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.NurseRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;
import com.ftn.dr_help.repository.RoomRepository;

@Service
public class PredefinedAppointmentService {

	@Autowired
	private AppointmentRepository repository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private NurseRepository nurseRepository;
	
	@Autowired
	private ProcedureTypeRepository procedureRepository;
	
	@Autowired
	private RoomRepository roomRepository;
	
	public List<PredefinedAppointmentDTO> getAll(Long id) {
		if(id == null) {
			return null;
		}
		
		List<PredefinedAppointmentDTO> ret = new ArrayList<PredefinedAppointmentDTO>();
		List<AppointmentPOJO> all = repository.findAllPredefined();
		
		for(AppointmentPOJO appointment : all) {
			if(appointment.getRoom().getClinic().getId().equals(id)) {
				ret.add(new PredefinedAppointmentDTO(appointment));
			}
		}
		
		return ret;
	}
	
	public PredefinedAppointmentDTO save(PredefinedAppointmentDTO newPredefined, String email) {
		if(newPredefined == null || 
				newPredefined.getDoctorId() == null ||
				newPredefined.getProcedureTypeId() == null ||
				newPredefined.getRoomId() == null ||
				newPredefined.getDateAndTime() == null ||
				newPredefined.getDateAndTime().isEmpty() ||
				newPredefined.getPrice() < 0) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		ClinicPOJO clinic = admin.getClinic();
    	if(clinic == null) {
    		return null;
    	}
    	
    	RoomPOJO room = roomRepository.findById(newPredefined.getRoomId()).orElse(null);
    	if(room == null || !room.getClinic().getId().equals(clinic.getId())) {
    		return null;
    	}
    	
    	DoctorPOJO doctor = doctorRepository.findById(newPredefined.getDoctorId()).orElse(null);
    	if(doctor == null || !doctor.getClinic().getId().equals(clinic.getId())) {
    		return null;
    	}
    	
    	NursePOJO nurse = nurseRepository.findById(newPredefined.getNurseId()).orElse(null);
    	if(nurse == null || !nurse.getClinic().getId().equals(clinic.getId())) {
    		return null;
    	}
    	
    	ProceduresTypePOJO procedureType = procedureRepository.findById(newPredefined.getProcedureTypeId()).orElse(null);
    	if(procedureType == null || !procedureType.getClinic().getId().equals(clinic.getId())) {
    		return null;
    	}

    	
    	AppointmentPOJO appointment = new AppointmentPOJO();
    	Calendar cal = Calendar.getInstance();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.ENGLISH);
    	try {
			cal.setTime(sdf.parse(newPredefined.getDateAndTime()));
		} catch (ParseException e) {
			return null;
		}
    	appointment.setDate(cal);
    	appointment.setRoom(room);
    	appointment.setDoctor(doctor);
    	appointment.setNurse(nurse);
    	appointment.setProcedureType(procedureType);
    	appointment.setDiscount(newPredefined.getDisscount());
    	appointment.setStatus(AppointmentStateEnum.AVAILABLE);
    	appointment.setDeleted(false);
		repository.save(appointment);
		
		doctor.getAppointmentList().add(appointment);
		doctorRepository.save(doctor);
		
		DoctorPOJO doc = doctorRepository.findOneByEmail(doctor.getEmail());
		System.out.println("DOCTOR APPOINTMENTS ARE:");
		for (AppointmentPOJO app : doc.getAppointmentList()) {
			System.out.println(app.getDoctor().getFirstName());
		}
		
		return newPredefined;
	}
	
	public void delete(Long id) { 
		AppointmentPOJO finded = repository.findById(id).orElse(null);
		if(finded == null) {
			return;
		}
		
		finded.setDeleted(true);
		repository.save(finded);
	}
}
