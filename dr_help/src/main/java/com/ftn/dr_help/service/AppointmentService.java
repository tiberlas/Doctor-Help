package com.ftn.dr_help.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.AppointmentStateEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.PatientRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	public boolean addAppointment (Long doctorId, String dateString, Long patientId) throws ParseException {
		AppointmentPOJO newAppointment = new AppointmentPOJO ();
		SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
		Date date = sdf.parse(dateString);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		newAppointment.setDate(calendar);
		newAppointment.setDeleted(false);
		DoctorPOJO doctor = doctorRepository.getOne(doctorId);
		newAppointment.setDoctor(doctor);
		newAppointment.setPatient(patientRepository.getOne(patientId));
		newAppointment.setStatus(AppointmentStateEnum.REQUESTED);
		newAppointment.setProcedureType(doctor.getProcedureType());
		newAppointment.setRoom(null);
		newAppointment.setNurse(null);
		newAppointment.setDiscount(1);
		newAppointment.setExaminationReport(null);
		appointmentRepository.save(newAppointment);
		
		return false;
	}
	
	
//	public List<PerscriptionPOJO> findPendingPerscriptions(Long nurseId) {
//		List<AppointmentPOJO> appointments = appointmentRepository.findDoneAppointmentsByNurseId(nurseId); //pristupi njihovim perscriptionima, 
//																				//i vrati perscriptione 
//		
//		List<PerscriptionPOJO> perscriptions = new ArrayList<PerscriptionPOJO>();
////		
////		for (AppointmentPOJO app : appointments) {
////			perscriptions.add(app.get)
////		}
////		
//	}
	

}
