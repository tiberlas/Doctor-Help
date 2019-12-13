package com.ftn.dr_help.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.comon.Mail;
import com.ftn.dr_help.dto.CentreAdminDTO;
import com.ftn.dr_help.dto.CentreAdminProfileDTO;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.PatientRequestDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.UserRequestPOJO;
import com.ftn.dr_help.service.CentreAdministratorService;
import com.ftn.dr_help.service.PatientService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/centreAdmins")
@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')") //authority level on the hole controller
public class CentreAdministratorController {
	
	@Autowired
	private CentreAdministratorService centreAdministratorService;
	
	@Autowired
	private PatientService patientService;
	

	@Autowired
    private JavaMailSender javaMailSender;
	
	@Autowired
	private AppPasswordEncoder encoder;

	@Autowired 
	private Mail mail;
	
	@Autowired
	private CurrentUser currentUser;

	
	@PostMapping(value = "/newAdmin", consumes = "application/json")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<CentreAdminDTO> saveAdmin(@RequestBody CentreAdminDTO centreAdminDTO) {
		
		CentreAdministratorPOJO c = centreAdministratorService.findOneByEmail(centreAdminDTO.getEmail());
		
		if( c != null) 
		{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		CentreAdministratorPOJO admin = new CentreAdministratorPOJO();
		admin.setFirstName(centreAdminDTO.getFirstName());
		admin.setLastName(centreAdminDTO.getLastName());
		admin.setEmail(centreAdminDTO.getEmail());
		
		String password = "coolpassword";
		
		String encoded = encoder.getEncoder().encode(password);
		//p.setPassword(encoded);
		admin.setPassword(encoded);
		mail.sendAccountInfoEmail(admin.getEmail(), password, admin.getFirstName(), admin.getLastName(), RoleEnum.CENTRE_ADMINISTRATOR);
		System.out.println("Successfully sent account info email.");
		
		admin.setMustChangePassword(true);
		
		admin = centreAdministratorService.save(admin);
		return new ResponseEntity<>(new CentreAdminDTO(admin), HttpStatus.CREATED);
	}
	
	
	@GetMapping(value = "/all")
	public ResponseEntity<List<CentreAdminDTO>> getAllAdmins() {

		List<CentreAdministratorPOJO> admins = centreAdministratorService.findAll();

		List<CentreAdminDTO> centreDTO = new ArrayList<>();
		for (CentreAdministratorPOJO a : admins) {
			centreDTO.add(new CentreAdminDTO(a));
		}
		
		return new ResponseEntity<>(centreDTO, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/requests")
	public ResponseEntity<List<PatientRequestDTO>> getPatientRequests() {
		List<UserRequestPOJO> requests = patientService.findAllRequests();
		
		List<PatientRequestDTO> requestDTO = new ArrayList<>();
		for (UserRequestPOJO request : requests) {
			requestDTO.add(new PatientRequestDTO(request));
		}
		
		return new ResponseEntity<>(requestDTO, HttpStatus.OK);
		
	}
	
	
	@GetMapping(value = "/profile")
	public ResponseEntity<CentreAdminProfileDTO> getCentreAdminProfile() {
		String email = currentUser.getEmail();
		
		CentreAdministratorPOJO ret = centreAdministratorService.findOneByEmail(email);
		CentreAdminProfileDTO dto = new CentreAdminProfileDTO(ret);
		
		if(ret == null) {
			return new ResponseEntity<CentreAdminProfileDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<CentreAdminProfileDTO>(dto, HttpStatus.OK);
	}
	
	
	@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CentreAdminProfileDTO> putAdminProfile(@RequestBody UserDetailDTO admin) {
		String email = currentUser.getEmail();
		
		CentreAdminProfileDTO ret = centreAdministratorService.save(admin, email);
		
		if(ret == null) {
			return new ResponseEntity<CentreAdminProfileDTO>(HttpStatus.NOT_ACCEPTABLE);
		}
		
		return new ResponseEntity<CentreAdminProfileDTO>(ret, HttpStatus.OK);
	}
	
	
	@PutMapping(value = "/change/password", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> putAdminPassword(@RequestBody ChangePasswordDTO passwords) {
		String email = currentUser.getEmail();

		boolean ret = centreAdministratorService.changePassword(passwords, email);
		
		if(ret) {
			return new ResponseEntity<String>("changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("not changed", HttpStatus.BAD_REQUEST);
		}
		
	}  
	
	
	@PostMapping(value = "/declineRequest", consumes = "application/json")
	public ResponseEntity<UserRequestPOJO> declineUserRequest(@RequestBody PatientRequestDTO patientDTO){
		 UserRequestPOJO requested = patientService.findByEmail(patientDTO.getEmail());
		 System.out.println("info " + requested.getEmail() + " " + patientDTO.getDeclinedDescription());
		 //TODO: remove the requested from database, send email
		
		mail.sendDeclineEmail(patientDTO.getEmail(), patientDTO.getDeclinedDescription(), requested.getFirstName(), requested.getLastName());
		System.out.println("Declination mail successfully sent.");
		
		patientService.remove(requested);
		System.out.println("Request successfully deleted");
		
		return new ResponseEntity<>(requested, HttpStatus.OK);
		
	}
	
	
	@PostMapping(value = "/acceptRequest", consumes = "application/json")
	public ResponseEntity<UserRequestPOJO> acceptUserRequest(@RequestBody PatientRequestDTO patientDTO) {
		System.out.println("MY EMAIL IS" + patientDTO.getEmail());
		UserRequestPOJO requested = patientService.findByEmail(patientDTO.getEmail());
		
		PatientPOJO p = new PatientPOJO();
		p.setActivated(false);
		p.setEmail(requested.getEmail());
		p.setFirstName(requested.getFirstName());
		p.setLastName(requested.getLastName());
		p.setAddress(requested.getAddress());
		p.setCity(requested.getCity());
		p.setState(requested.getState());
		p.setBirthday(requested.getBirthday());
		p.setInsuranceNumber(requested.getInsuranceNumber());
		p.setPhoneNumber(requested.getPhoneNumber());
		System.out.println(p);
		
		//PasswordEncoder passwordEncoder = AppPasswordEncoder.getEncoder();
		System.out.println("Password is " + requested.getPassword());
		String encoded = encoder.getEncoder().encode(requested.getPassword());
		p.setPassword(encoded);

		
	/*	PasswordValidateInterface validate = new PasswordValidate();
		
		if(validate.isValid(requested.getPassword(), patientDTO.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(password.getNewPassword());
			c.setPassword(encoded);*/
		
		
		patientService.save(p);
		System.out.println("Patient successfully registered.");
		
		try {
			mail.sendAcceptEmail(p.getEmail(), p.getFirstName(), p.getLastName());
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("Successfully sent email.");
		
		patientService.remove(requested);
		System.out.println("Request successfully deleted");
		

		return new ResponseEntity<>(requested, HttpStatus.OK);
	}
	
	
	

	
	
	
}
