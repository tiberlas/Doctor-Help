package com.ftn.dr_help.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.AddAppointmentDTO;
import com.ftn.dr_help.service.AppointmentService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping (value = "api/appointments/")
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
	
	
	
	
	
	
//	@PostMapping(value = "/filter", consumes = "application/json", produces = "application/json")
//	@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
//	public ResponseEntity<List<ProcedureTypeDTO>> filter(@RequestBody ProcedureTypeFilterDTO filter) {
	
	@PostMapping (value = "add", consumes = "application/json", produces = "application/json")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<String> add (@RequestBody AddAppointmentDTO dto) throws NumberFormatException, ParseException {
//		System.out.println("Doctor id: " + dto.getDoctorId());
//		System.out.println("Date: " + dto.getDate());
//		System.out.println("Time: " + dto.getTime());
		String dateString = dto.getDate() + " " + dto.getTime() + ":00";
		System.out.println("Date string: " + dateString);
//		System.out.println("Patient id: " + dto.getPatientId());
		
		appointmentService.addAppointment(Long.parseLong(dto.getDoctorId()), dateString, Long.parseLong(dto.getPatientId()));
		
		
		return null;
	}
	
	
}
