package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.MedicalStuffProfileDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.service.DoctorService;

@RestController
@RequestMapping(value = "api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

	@Autowired
	private DoctorService service;
	
	@Autowired
	private CurrentUser currentUser;
	
	@GetMapping(value = "/profile")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<MedicalStuffProfileDTO> findProfile() {
		String email = currentUser.getEmail();
		
		MedicalStuffProfileDTO ret = service.findByEmail(email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStuffProfileDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<MedicalStuffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<MedicalStuffProfileDTO> putAdminProfile(@RequestBody UserDetailDTO doctor) {
		String email = currentUser.getEmail();
		
		MedicalStuffProfileDTO ret = service.save(doctor, email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStuffProfileDTO>(HttpStatus.NOT_ACCEPTABLE); //406
		}
		
		return new ResponseEntity<MedicalStuffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change/password", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<String> putAdminPassword(@RequestBody ChangePasswordDTO passwords) {
		String email = currentUser.getEmail();
		
		boolean ret = service.changePassword(passwords, email);
		
		if(ret) {
			return new ResponseEntity<String>("changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("not changed", HttpStatus.NOT_ACCEPTABLE);
		}
		
	} 
}
