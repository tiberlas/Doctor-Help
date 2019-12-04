package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.Calendar;
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
import com.ftn.dr_help.dto.ClinicAdminDTO;
import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.ClinicAdministratorService;
import com.ftn.dr_help.service.ClinicService;
import com.ftn.dr_help.validation.PasswordValidate;

@RestController
@RequestMapping(value = "api/clinicAdmins")
@CrossOrigin(origins = "http://localhost:3000")
public class ClinicAdministratorController {

		@Autowired
		private ClinicAdministratorService clinicAdministratorService;
		
		@Autowired
		private ClinicService clinicService;
		
	
		
		@PostMapping(value = "/newAdmin", consumes = "application/json")
		@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
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
		@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
		public ResponseEntity<List<ClinicAdministratorPOJO>> getAllCentreAdministrators() {

			List<ClinicAdministratorPOJO> admins = clinicAdministratorService.findAll();
			List<ClinicAdministratorPOJO> adminDTO = new ArrayList<>();
			for (ClinicAdministratorPOJO s : admins) {
				adminDTO.add(s);
			}

			return new ResponseEntity<>(adminDTO, HttpStatus.OK);
		}

		@GetMapping(value = "/name")
		@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
		public ResponseEntity<ClinicAdminNameDTO> getClinicAdministratorsName() {
			String email = CurrentUser.getEmail();
			
			ClinicAdminNameDTO ret = clinicAdministratorService.findOnesName(email);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminNameDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminNameDTO>(ret, HttpStatus.OK);
		}
		
		@GetMapping(value = "/profile")
		@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
		public ResponseEntity<ClinicAdminProfileDTO> getClinicAdminProfile() {
			String email = CurrentUser.getEmail();
			
			ClinicAdminProfileDTO ret = clinicAdministratorService.findOneProfile(email);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminProfileDTO>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<ClinicAdminProfileDTO>(ret, HttpStatus.OK);
		}
				

		@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
		@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
		public ResponseEntity<ClinicAdminProfileDTO> putAdminProfile(@RequestBody UserDetailDTO admin) {
			String email = CurrentUser.getEmail();
			
			ClinicAdminProfileDTO ret = clinicAdministratorService.save(admin, email);
			
			if(ret == null) {
				return new ResponseEntity<ClinicAdminProfileDTO>(HttpStatus.NOT_ACCEPTABLE);
			}
			
			return new ResponseEntity<ClinicAdminProfileDTO>(ret, HttpStatus.OK);
		}
		
		@PutMapping(value = "/change/password", consumes = MediaType.APPLICATION_JSON_VALUE)
		@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
		public ResponseEntity<String> putAdminPassword(@RequestBody ChangePasswordDTO passwords) {
			String email = CurrentUser.getEmail();

			boolean ret = clinicAdministratorService.changePassword(passwords, email);
			
			if(ret) {
				return new ResponseEntity<String>("changed", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("not changed", HttpStatus.NOT_ACCEPTABLE);
			}
			
		}  
	
}
