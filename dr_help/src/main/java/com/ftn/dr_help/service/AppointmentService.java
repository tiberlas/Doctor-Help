package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.PerscriptionPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	
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
