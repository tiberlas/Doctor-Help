package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.service.ClinicService;

@RestController
@RequestMapping(value = "api/clinic")
@CrossOrigin(origins = "http://localhost:3000")
public class ClinicController {
	
	@Autowired
	private ClinicService service;
	
	@GetMapping(value = "/{id}/rooms")
	public ResponseEntity<ClinicRoomListDTO> getCentreAdministratorsName(@PathVariable("id") Long id) {
		ClinicRoomListDTO ret = service.getAllRooms(id);
		
		if(ret == null)
			return new ResponseEntity<ClinicRoomListDTO>(HttpStatus.INTERNAL_SERVER_ERROR);
		return new ResponseEntity<ClinicRoomListDTO>(ret, HttpStatus.OK);
	}

}
