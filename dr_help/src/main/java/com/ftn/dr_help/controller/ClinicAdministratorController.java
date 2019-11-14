package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.service.ClinicAdministratorService;

@RestController
@RequestMapping(value = "api/clinicAdmins")
@CrossOrigin(origins = "http://localhost:3000")
public class ClinicAdministratorController {

		@Autowired
		private ClinicAdministratorService clinicAdministratorService;
		
		@GetMapping(value = "/{id}/name")
		public ResponseEntity<ClinicAdminNameDTO> getClinicAdministratorsName(@PathVariable("id") Long id) {
			ClinicAdminNameDTO ret = clinicAdministratorService.findOnesName(id);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminNameDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminNameDTO>(ret, HttpStatus.OK);
		}
		
		@GetMapping(value = "/{id}/profile")
		public ResponseEntity<ClinicAdminProfileDTO> getClinicAdminProfile(@PathVariable("id") Long id) {
			ClinicAdminProfileDTO ret = clinicAdministratorService.findOneProfile(id);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminProfileDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminProfileDTO>(ret, HttpStatus.OK);
		}

		@CrossOrigin
		@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<ClinicAdminProfileDTO> putAdminProfile(@RequestBody ClinicAdminProfileDTO admin) {
			
			ClinicAdminProfileDTO ret = clinicAdministratorService.save(admin);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminProfileDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminProfileDTO>(ret, HttpStatus.OK);
		}
		
	
}
