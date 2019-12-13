package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.MedicationDTO;
import com.ftn.dr_help.model.pojo.MedicationPOJO;
import com.ftn.dr_help.service.MedicationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping (value = "api/medication")
public class MedicationController {

	@Autowired
	private MedicationService medicationService;
	
	
	@PostMapping(value = "/new", consumes = "application/json")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<MedicationDTO> newMedication(@RequestBody MedicationDTO medication) {
		
		MedicationPOJO m = medicationService.findByName(medication.getName());
		
		if(m != null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		MedicationPOJO med = new MedicationPOJO();
		med.setMedicationName(medication.getName());
		med.setMedDescription(medication.getDescription());
	
		med = medicationService.save(med);
		
		
		
		return new ResponseEntity<>(new MedicationDTO(med) , HttpStatus.CREATED);
	}
	
	
	
	@GetMapping(value = "/all")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<List<MedicationDTO>> getAllMedication() {

		List<MedicationPOJO> meds = medicationService.findAll();

		List<MedicationDTO> medsDTO = new ArrayList<>();
		for (MedicationPOJO a : meds) {
			medsDTO.add(new MedicationDTO(a));
		}
		
		return new ResponseEntity<>(medsDTO, HttpStatus.OK);
	}

}
