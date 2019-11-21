package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.LoginRequestDTO;
import com.ftn.dr_help.dto.LoginResponseDTO;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.service.LoginService;
 
@RestController
@RequestMapping (value = "/api")
@CrossOrigin (origins="http://localhost:3000")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping (value = "/login", consumes = "application/json", produces = "application/json")
	public ResponseEntity<LoginResponseDTO> login (@RequestBody  LoginRequestDTO loginRequest){

		System.out.println("Login kontroler: ");
		System.out.println("Email: " + loginRequest.getEmail());
		System.out.println("Password: " + loginRequest.getPassword());
		
		PatientPOJO patientResponse =  loginService.getPatientLoginResponse(loginRequest.getEmail());
		if (patientResponse != null) {
			if (!patientResponse.getPassword ().equals (loginRequest.getPassword())) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
			if (!patientResponse.isActivated()) {
				return new ResponseEntity<> (HttpStatus.PRECONDITION_REQUIRED);
			}
			LoginResponseDTO retVal = new LoginResponseDTO ();
			retVal.setId (patientResponse.getId ());
			retVal.setUserRole (patientResponse.getRole ());
			
			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
		}
		
		DoctorPOJO doctorResponse = loginService.getDoctorLoginResponse (loginRequest.getEmail());
		if (doctorResponse != null) {
			if (!doctorResponse.getPassword ().equals (loginRequest.getPassword ())) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
			LoginResponseDTO retVal = new LoginResponseDTO ();
			retVal.setId(doctorResponse.getId ());
			retVal.setUserRole(doctorResponse.getRole ());
		
			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
		}
		
		CentreAdministratorPOJO centreAdministratorResponse = loginService.getCentreAdministratorLoginResponse (loginRequest.getEmail ());
		if (centreAdministratorResponse != null) {
			if (!centreAdministratorResponse.getPassword ().equals (loginRequest.getPassword ())) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
			LoginResponseDTO retVal = new LoginResponseDTO ();
			retVal.setId(centreAdministratorResponse.getId ());
			retVal.setUserRole(centreAdministratorResponse.getRole());
			
			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
		}
		
		ClinicAdministratorPOJO clinicAdministratorResponse = loginService.getClinicAdministratorLoginResponse (loginRequest.getEmail ());
		if (clinicAdministratorResponse != null) {
			if (!clinicAdministratorResponse.getPassword ().equals (loginRequest.getPassword ())) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
			LoginResponseDTO retVal = new LoginResponseDTO ();
			retVal.setId(clinicAdministratorResponse.getId ());
			retVal.setUserRole(clinicAdministratorResponse.getRole());
			
			System.out.println(loginRequest.getEmail() + "   " + loginRequest.getPassword());
			
			
			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
		}
		
		NursePOJO nurseResponse = loginService.getNurseLoginResponse (loginRequest.getEmail ());
		if (nurseResponse != null) {
			if (!nurseResponse.getPassword ().equals (loginRequest.getPassword ())) {
				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
			}
			LoginResponseDTO retVal = new LoginResponseDTO ();
			retVal.setId(nurseResponse.getId ());
			retVal.setUserRole(nurseResponse.getRole());
			
			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
		}
		
		return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
		
	}
	
}
