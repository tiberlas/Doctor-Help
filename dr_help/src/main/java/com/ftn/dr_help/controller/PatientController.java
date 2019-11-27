package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientProfileDTO;
import com.ftn.dr_help.dto.PatientRequestDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.service.PatientService;

@RestController
@RequestMapping (value = "api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	
	@GetMapping(value = "/all")
	public ResponseEntity<List<PatientDTO>> getAllPatients() {

		List<PatientPOJO> patients = patientService.findAll();

		List<PatientDTO> patientDTO = new ArrayList<>();
		for (PatientPOJO p : patients) {
			patientDTO.add(new PatientDTO(p));
		}
		
		return new ResponseEntity<>(patientDTO, HttpStatus.OK);
	}
	
	
	@PutMapping(value = "/confirmAccount", consumes = "application/json")
	public ResponseEntity<PatientPOJO> confirmPatientAccount(@RequestBody PatientRequestDTO patient) {
		System.out.println("Upao sam ovde");
		
		PatientPOJO p = patientService.findPatientByEmail(patient.getEmail());
		
		if(p == null) {
			return new ResponseEntity<PatientPOJO>(HttpStatus.NOT_FOUND);
		}
		
		p.setActivated(true);
		patientService.save(p);
		
		return new ResponseEntity<PatientPOJO>(p, HttpStatus.OK);
	}
	
	@GetMapping (value="/{id}/profile")
	public ResponseEntity<PatientProfileDTO> getPatientProfile (@PathVariable("id") Long id) {
		PatientProfileDTO retVal = patientService.getPatientProfile(id);
		
		if (retVal == null) {
			return new ResponseEntity<> (HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<PatientProfileDTO> (retVal, HttpStatus.OK);
	}
	
}
