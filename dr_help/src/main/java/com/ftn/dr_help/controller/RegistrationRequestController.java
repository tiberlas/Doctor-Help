package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.RegistrationRequestDTO;

@RestController
@RequestMapping (value = "/api/register")
@CrossOrigin (origins = "http://localhost:3000")
public class RegistrationRequestController {
	
	@Autowired
	private RegistrationRequestService registrationRequestService;
	
	@PostMapping (value = "/register", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Void> requestRegistration (@RequestBody RegistrationRequestDTO registrationRequest) {
		
		return new ResponseEntity<Void> (HttpStatus.OK);
	}
	
}
