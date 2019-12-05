package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientNameDTO;
import com.ftn.dr_help.dto.PatientRequestDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.service.PatientService;

@RestController
@RequestMapping (value = "api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@GetMapping(value = "/all/names")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<List<PatientNameDTO>> getAllPatientNames() {

		List<PatientNameDTO> ret = patientService.findAllNames();
		
		if(ret == null) {
			return new ResponseEntity<List<PatientNameDTO>>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<List<PatientNameDTO>>(ret, HttpStatus.OK);
	}
	
	@GetMapping(value = "/id={id}/profile")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<PatientDTO> getPatientProfile(@PathVariable("id") Long id ) {

		PatientDTO ret = patientService.findById(id);
		
		if(ret == null) {
			return new ResponseEntity<PatientDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<PatientDTO>(ret, HttpStatus.OK);
	}
	
	
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
	
}
