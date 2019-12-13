package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientFilterDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.service.NurseService;
import com.ftn.dr_help.service.PatientService;

@RestController
@RequestMapping(value = "api/nurses")
@CrossOrigin(origins = "http://localhost:3000")
public class NurseController {
	
	@Autowired
	private NurseService service;
	
	@Autowired
	private CurrentUser currentUser;
	
	@Autowired
	private PatientService patientService;
	
	
	@GetMapping(value = "/profile")
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<MedicalStaffProfileDTO> findProfile() {
		String email = currentUser.getEmail();
		
		MedicalStaffProfileDTO ret = service.findByEmail(email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStaffProfileDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<MedicalStaffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<MedicalStaffProfileDTO> putAdminProfile(@RequestBody UserDetailDTO nurse) {
		String email = currentUser.getEmail();
		
		MedicalStaffProfileDTO ret = service.save(nurse, email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStaffProfileDTO>(HttpStatus.NOT_ACCEPTABLE); //406
		}
		
		return new ResponseEntity<MedicalStaffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change/password", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<String> putAdminPassword(@RequestBody ChangePasswordDTO passwords) {
		String email = currentUser.getEmail();
		
		boolean ret = service.changePassword(passwords, email);
		
		if(ret) {
			return new ResponseEntity<String>("changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("not changed", HttpStatus.NOT_ACCEPTABLE);
		}
		
	} 
	
	
	@GetMapping(value = "/patientList")
	public ResponseEntity<List<PatientDTO>> getAllPatients() {

		List<PatientPOJO> patients = patientService.findAll();

		List<PatientDTO> patientDTO = new ArrayList<>();
		for (PatientPOJO p : patients) {
			patientDTO.add(new PatientDTO(p));
		}
		
		return new ResponseEntity<>(patientDTO, HttpStatus.OK);
	}
	
	
	@PostMapping(value = "/filterPatients", consumes = "application/json", produces = "application/json")
	public ResponseEntity<List<PatientDTO>> getFilteredPatients(@RequestBody PatientFilterDTO filterResults) {
		
		if(filterResults.getFilterResults().trim().equals("")) { //if search result is empty, return all
			List<PatientPOJO> patients = patientService.findAll();
			
			List<PatientDTO> patientDTO = new ArrayList<>();
			for (PatientPOJO p : patients) {
				patientDTO.add(new PatientDTO(p));
			}
			return new ResponseEntity<>(patientDTO, HttpStatus.OK);
		} 
		
		List<PatientPOJO> patients = patientService.singleFilterPatients(filterResults.getFilterResults());

		List<PatientDTO> patientDTO = new ArrayList<>();
		for (PatientPOJO p : patients) {
			patientDTO.add(new PatientDTO(p));
		}
		
		return new ResponseEntity<>(patientDTO, HttpStatus.OK);
		
	}

}
