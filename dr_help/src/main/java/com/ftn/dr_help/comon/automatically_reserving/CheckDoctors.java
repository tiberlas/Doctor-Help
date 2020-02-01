package com.ftn.dr_help.comon.automatically_reserving;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.service.DoctorService;

@Component
public class CheckDoctors implements CheckDoctorsInterface{

	@Autowired
	private DoctorService doctorService;
	
	@Override
	public FreeDoctorForAutomaticallyReserving findFreeDoctor(Calendar requestingDate, Long clinicId, Long procedureId) {
		
		List<DoctorPOJO> doctors = doctorService.getAllDoctorsFromClinicWithSpecialization(clinicId, procedureId);
		
		Calendar firstFreeDate = Calendar.getInstance();
		firstFreeDate.add(Calendar.YEAR, 1);
		DoctorPOJO firstFreeDoctor = null;
		
		for(DoctorPOJO doctor : doctors) {
			Calendar freeDate = doctorService.checkSchedue(doctor.getEmail(), requestingDate);
			
			if(freeDate.equals(requestingDate)) {
				return new FreeDoctorForAutomaticallyReserving(null, doctor);
			} else if(freeDate.before(firstFreeDate)) {
				firstFreeDate = (Calendar) freeDate.clone();
				firstFreeDoctor = doctor;
			}
		}
		
		return new FreeDoctorForAutomaticallyReserving(firstFreeDate, firstFreeDoctor);
	}
	

}
