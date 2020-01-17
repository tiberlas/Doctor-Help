package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.service.OperationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping (value = "api/operations")
public class OperationController {

	@Autowired
	private OperationService operationServie;
	
	@Autowired
	private CurrentUser currentUser;
	
	@PostMapping(value = "/request/doctor", consumes = "application/json")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<String> createDoctorRequestedOperation(@RequestBody OperationRequestDTO requested) {
		String email = currentUser.getEmail();
		boolean success = operationServie.doctorRequestAppointment(requested, email);
		
		if(!success)
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<String>(HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/requested={id}/delete")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<String> deleteRequestedOperation(@PathVariable("id") Long operationID) {
		
		boolean deleted = operationServie.deleteRequested(operationID);
		
		if(deleted) {
			return new ResponseEntity<>("success", HttpStatus.ACCEPTED); //202
		} else {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN); //403
		}
	}
}
