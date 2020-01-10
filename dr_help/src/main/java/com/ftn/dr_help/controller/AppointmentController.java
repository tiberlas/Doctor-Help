package com.ftn.dr_help.controller;


import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.AddAppointmentDTO;
import com.ftn.dr_help.dto.DoctorAppointmentDTO;
import com.ftn.dr_help.dto.ExaminationReportDTO;
import com.ftn.dr_help.dto.nurse.NurseAppointmentDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.service.AppointmentService;
import com.ftn.dr_help.service.PatientService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping (value = "api/appointments/")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private PatientService patientService;
	
	
	
	@GetMapping(value = "/all_appointments/doctor={doctor_id}")
	public ResponseEntity<List<DoctorAppointmentDTO>> getAllDoctorAppointments(@PathVariable("doctor_id") Long doctor_id) {
		
		List<DoctorAppointmentDTO> appointments = appointmentService.findDoctorAppointments(doctor_id);
		
		return new ResponseEntity<List<DoctorAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
	@GetMapping(value="/all_appointments/nurse={nurse_id}")
	public ResponseEntity<List<NurseAppointmentDTO>> getAllNurseAppointments(@PathVariable("nurse_id") Long nurse_id) {
		
		List<NurseAppointmentDTO> appointments = appointmentService.findNurseAppointments(nurse_id);
		
		return new ResponseEntity<List<NurseAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
	
	@PutMapping(value="/done={id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<ExaminationReportDTO> finishAppointment(@PathVariable("id") Long appointmentId, @RequestBody ExaminationReportDTO report) {
		
		AppointmentPOJO app = appointmentService.finishAppointment(appointmentId, report);
		System.out.println("Appointment with ID: " + app.getId() + "switched to status DONE.");
		return new ResponseEntity<ExaminationReportDTO>(report, HttpStatus.OK);
	}
	
	@GetMapping(value="/approved_appointments/doctor={doctor_id}/patient={insuranceNumber}")
	public ResponseEntity<List<DoctorAppointmentDTO>> 
		getAllApprovedDoctorAppointmentsForPatientWithId(@PathVariable("doctor_id") Long doctor_id, 
			@PathVariable("insuranceNumber") Long insuranceNumber) {
		PatientPOJO patient = patientService.findByInsuranceNumber(insuranceNumber);
		List<DoctorAppointmentDTO> appointments = appointmentService.findApprovedDoctorAppointmentsWithPatientId(patient.getId(), doctor_id);
		
		return new ResponseEntity<List<DoctorAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
	@PostMapping (value = "add", consumes = "application/json", produces = "application/json")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<String> add (@RequestBody AddAppointmentDTO dto) throws NumberFormatException, ParseException {

		String dateString = dto.getDate() + " " + dto.getTime() + ":00";
		System.out.println("Date string: " + dateString);
		
		appointmentService.addAppointment(Long.parseLong(dto.getDoctorId()), dateString, Long.parseLong(dto.getPatientId()));
		
		
		return null;
	}
	
	@GetMapping(value="/done_appointments/doctor/patient={insuranceNumber}")
	public ResponseEntity<List<DoctorAppointmentDTO>> 
		getAllDoctorDoneAppointmentsForPatientWithId(@PathVariable("insuranceNumber") Long insuranceNumber) {
		PatientPOJO patient = patientService.findByInsuranceNumber(insuranceNumber);
		List<DoctorAppointmentDTO> appointments = appointmentService.findDoctorDoneAppointmentsForPatientWithId(patient.getId());
		
		return new ResponseEntity<List<DoctorAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
	@GetMapping(value="/done_appointments/nurse/patient={insuranceNumber}")
	public ResponseEntity<List<NurseAppointmentDTO>> 
		getAllNurseDoneAppointmentsForPatientWithId(@PathVariable("insuranceNumber") Long insuranceNumber) {
		PatientPOJO patient = patientService.findByInsuranceNumber(insuranceNumber);
		List<NurseAppointmentDTO> appointments = appointmentService.findNurseDoneAppointmentsForPatientWithId(patient.getId());
		
		return new ResponseEntity<List<NurseAppointmentDTO>>(appointments, HttpStatus.OK);
	}
	
	@GetMapping(value="/get-examination-report/appointment={id}/doctor={doctor_id}")
	public ResponseEntity<ExaminationReportDTO> getExaminationReportForDoneAppointment(@PathVariable("id") Long appointmentId,
			@PathVariable("doctor_id") Long doctor_id) {
		
		ExaminationReportDTO dto = appointmentService.findExaminationReportForDoneAppointment(appointmentId, doctor_id);
		return new ResponseEntity<ExaminationReportDTO>(dto, HttpStatus.OK);
	}
	
	@PutMapping(value="/update/appointment={id}")
	public ResponseEntity<ExaminationReportDTO> updateExaminationReport(@PathVariable("id") Long appointment_id, 
			@RequestBody ExaminationReportDTO ex ) {
		
		boolean ret = appointmentService.updateExaminationReportDTO(appointment_id, ex);
		if(ret) {
			return new ResponseEntity<ExaminationReportDTO>(ex, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}
	
}
