package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.AppointmentService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping (value = "api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	
	
//	@GetMapping(value = "/all")
//	public ResponseEntity<List<ClinicDTO>> getAllClinics() {
//		
//		List<AppointmentPOJO> appointments = appointmentService.findDoneAppointments();
//		
//		//List<AppointmentPOJO> list = new ArrayList<AppointmentPOJO>();
//		
//		for (AppointmentPOJO appointmentPOJO : appointments) {
//			System.out.println(appointmentPOJO);
//		}
//		
//		System.out.println("Appointments: " + appointments);
//		
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
	
}
