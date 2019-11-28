package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.service.DoctorService;

@RestController
@RequestMapping(value = "api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

	@Autowired
	private DoctorService service;
	
	@GetMapping(value = "/profile")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<DoctorProfileDTO> findProfile() {
		String email = CurrentUser.getEmail();
		
		DoctorProfileDTO ret = service.findByEmail(email);
		
		if(ret == null) {
			return new ResponseEntity<DoctorProfileDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<DoctorProfileDTO>(ret, HttpStatus.OK);
	}
	
}
