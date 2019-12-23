package com.ftn.dr_help.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.DoctorAppointmentDTO;
import com.ftn.dr_help.service.AppointmentService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping (value = "api/appointments")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	
	
	@GetMapping(value = "/all_appointments/doctor={doctor_id}")
	public ResponseEntity<List<DoctorAppointmentDTO>> getAllDoctorAppointments(@PathVariable("doctor_id") Long doctor_id) {
		
		List<DoctorAppointmentDTO> appointments = appointmentService.findDoctorAppointments(doctor_id);
		
		System.out.println("Ima ih ukupno");
		
		return new ResponseEntity<List<DoctorAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
}
