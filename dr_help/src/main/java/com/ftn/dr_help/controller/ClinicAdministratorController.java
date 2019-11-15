package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicAdminDTO;
import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.ClinicAdministratorService;
import com.ftn.dr_help.service.ClinicService;

@RestController
@RequestMapping(value = "api/clinicAdmins")
@CrossOrigin(origins = "http://localhost:3000")
public class ClinicAdministratorController {

		@Autowired
		private ClinicAdministratorService clinicAdministratorService;
		
		@Autowired
		private ClinicService clinicService;
		
		
		@PostMapping(value = "/newAdmin", consumes = "application/json")
		public ResponseEntity<ClinicAdminDTO> saveAdmin(@RequestBody ClinicAdminDTO clinicAdminDTO) {
			System.out.println("works" + clinicAdminDTO.getId() + " " +  clinicAdminDTO.getFirstName() + " " + clinicAdminDTO.getLastName() + " " + clinicAdminDTO.getEmail());
			ClinicAdministratorPOJO admin = new ClinicAdministratorPOJO();
			
			//TODO: find the clinic that is sent via DTO:
			ClinicPOJO c = clinicService.findOne(clinicAdminDTO.getId());
			if(c != null) admin.setClinic(c);
			admin.setFirstName(clinicAdminDTO.getFirstName());
			admin.setLastName(clinicAdminDTO.getLastName());
			admin.setEmail(clinicAdminDTO.getEmail());
			admin.setPassword("impressive password");
			admin.setAddress("...");
			admin.setBirthday(Calendar.getInstance());
			admin.setCity("...");
			admin.setPhoneNumber("...");
			admin.setState("...");
			
			admin = clinicAdministratorService.save(admin);
			return new ResponseEntity<>(new ClinicAdminDTO(admin), HttpStatus.CREATED);
		}
		

		@GetMapping(value = "/all")
		public ResponseEntity<List<ClinicAdministratorPOJO>> getAllCentreAdministrators() {

			List<ClinicAdministratorPOJO> admins = clinicAdministratorService.findAll();
			List<ClinicAdministratorPOJO> adminDTO = new ArrayList<>();
			for (ClinicAdministratorPOJO s : admins) {
				adminDTO.add(s);
			}

			return new ResponseEntity<>(adminDTO, HttpStatus.OK);
		}

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
				

		@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<ClinicAdminProfileDTO> putAdminProfile(@RequestBody ClinicAdminProfileDTO admin) {
			
			ClinicAdminProfileDTO ret = clinicAdministratorService.save(admin);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminProfileDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminProfileDTO>(ret, HttpStatus.OK);
		}
		
	
}
