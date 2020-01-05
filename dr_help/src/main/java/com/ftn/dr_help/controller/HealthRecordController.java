package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.PatientHealthRecordDTO;
import com.ftn.dr_help.service.PatientService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/healthRecord")
public class HealthRecordController {
	
	@Autowired
	private PatientService patientService;
	
	
	@PutMapping(value="/update/insurance={id}", consumes = "application/json")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<PatientHealthRecordDTO> updateHealthRecord(@PathVariable("id") Long insuranceId, @RequestBody PatientHealthRecordDTO dto) {
		
		System.out.println("incomming dto: " + dto.getDiopter() + " " + dto.getHeight() + " " + dto.getWeight() + " " + dto.getAllergyList() + " " + dto.getBloodType());
		PatientHealthRecordDTO returnDTO = patientService.findHealthRecordByInsuranceNumber(insuranceId, dto);
		
		if(returnDTO == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<PatientHealthRecordDTO>(returnDTO, HttpStatus.OK);
	}

}
