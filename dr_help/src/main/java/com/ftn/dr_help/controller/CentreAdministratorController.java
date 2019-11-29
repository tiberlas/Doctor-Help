package com.ftn.dr_help.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.CentreAdminDTO;
import com.ftn.dr_help.dto.PatientRequestDTO;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.UserRequestPOJO;
import com.ftn.dr_help.service.CentreAdministratorService;
import com.ftn.dr_help.service.PatientService;
import com.ftn.dr_help.validation.PasswordValidate;
import com.ftn.dr_help.validation.PasswordValidateInterface;

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

	
	@PostMapping(value = "/newAdmin", consumes = "application/json")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<CentreAdminDTO> saveAdmin(@RequestBody CentreAdminDTO centreAdminDTO) {
		System.out.println("works");
		CentreAdministratorPOJO admin = new CentreAdministratorPOJO();
		admin.setFirstName(centreAdminDTO.getFirstName());
		admin.setLastName(centreAdminDTO.getLastName());
		admin.setEmail(centreAdminDTO.getEmail());
		admin.setPassword("impressive password");
		
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
	
	@GetMapping(value = "/createRequests")
	public void createRequests() {
		patientService.createAllRequests();
	}
	
	@PostMapping(value = "/declineRequest", consumes = "application/json")
	public ResponseEntity<UserRequestPOJO> declineUserRequest(@RequestBody PatientRequestDTO patientDTO){
		 UserRequestPOJO requested = patientService.findByEmail(patientDTO.getEmail());
		 System.out.println("info " + requested.getEmail() + " " + patientDTO.getDeclinedDescription());
		 //TODO: remove the requested from database, send email
		
		sendDeclineEmail(patientDTO.getEmail(), patientDTO.getDeclinedDescription(), requested.getFirstName(), requested.getLastName());
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
		
		
		
		PasswordEncoder passwordEncoder = AppPasswordEncoder.getEncoder();
		
		if(passwordEncoder.matches(patientDTO.getPassword(), requested.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(patientDTO.getPassword());
			p.setPassword(encoded);
			System.out.println("matches");
		}
		
	/*	PasswordValidateInterface validate = new PasswordValidate();
		
		if(validate.isValid(requested.getPassword(), patientDTO.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(password.getNewPassword());
			c.setPassword(encoded);*/
		
		
		patientService.save(p);
		System.out.println("Patient successfully registered.");
		
		try {
			sendAcceptEmail(p.getEmail(), p.getFirstName(), p.getLastName());
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
	
	
	

	void sendAcceptEmail(String sendTo, String firstName, String lastName) throws MessagingException, IOException  {
		
			MimeMessage msg = javaMailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
	        helper.setTo(sendTo);

	        helper.setSubject("DrHelp account registration");
	        String text = "Dear sir/madam, " + '\n';
	        text += "your account request has been reviewed and accepted by our administrator staff. \n Please follow the link below to activate your account.";
	        text += "http://localhost:3000/activate=" + sendTo + "\n\n\n" + "Forever helping, drHelp.";
	        helper.setText(text);

	       javaMailSender.send(msg);
		
	}
	
	
	void sendDeclineEmail(String sendTo, String description, String firstName, String lastName) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(sendTo);

        msg.setSubject("DrHelp account registration");
        String text = "Dear sir/madam, " + '\n';
        text += "your account request has been reviewed. Unfortunately, it has been declined, with an administrator message attached:";
        text += "\n\n\n" + description;
        text += "\n\n\n" + "Forever helping, drHelp.";
        msg.setText(text);

        javaMailSender.send(msg);

    }
	
	
}
