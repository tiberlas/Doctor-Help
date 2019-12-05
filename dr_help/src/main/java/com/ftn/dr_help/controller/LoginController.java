package com.ftn.dr_help.controller;

import java.io.IOException;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.config.JwtTokenUtil;
import com.ftn.dr_help.dto.LoginRequestDTO;
import com.ftn.dr_help.dto.LoginResponseDTO;
import com.ftn.dr_help.dto.TokenDTO;
import com.ftn.dr_help.model.pojo.UserPOJO;
 
@RestController
@RequestMapping (value = "/api")
@CrossOrigin (origins="http://localhost:3000")
public class LoginController {
	
	/*
	 * login uses JWT and this class has no need for a service
	 * it uses JWT's service
	 * */
	
//	@Autowired
//	private LoginService loginService;
	
	@Autowired
	JwtTokenUtil tokenUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@PostMapping(value = "/refreshToken", consumes = "application/json", produces = "application/json") 
	public ResponseEntity<TokenDTO> refreshToken(@RequestBody TokenDTO token) {
		TokenDTO t = new TokenDTO();
		System.out.println("i am here");
		
//		if(tokenUtils.i)
		if(tokenUtils.canTokenBeRefreshed(token.getJwtToken())) {
			String jwt = tokenUtils.refreshToken(token.getJwtToken());
			t.setJwtToken(jwt);
			return ResponseEntity.ok(t);
		} 
		return new ResponseEntity<TokenDTO>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping (value = "/login", consumes = "application/json", produces = "application/json")
	public ResponseEntity<LoginResponseDTO> createAuthenticationToken(@RequestBody LoginRequestDTO loginRequest,
			HttpServletResponse response) throws AuthenticationException, IOException {

		System.out.println("Email: " + loginRequest.getEmail());
		System.out.println("Password: " + loginRequest.getPassword());
		
		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
						loginRequest.getPassword()));

		// Ubaci username + password u kontext
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		// Kreiraj token
		UserPOJO user = (UserPOJO) authentication.getPrincipal();
		String jwt = tokenUtils.generateToken(user);
		int expiresIn = tokenUtils.getExpiredIn();

		//odgovor servera
		LoginResponseDTO ret = new LoginResponseDTO(user.getId(), user.getRole(), jwt, expiresIn, user.getMustChangePassword());
		
		
		// Vrati token kao odgovor na uspesno autentifikaciju
		return ResponseEntity.ok(ret);
	
		
//		PatientPOJO patientResponse =  loginService.getPatientLoginResponse(loginRequest.getEmail());
//		if (patientResponse != null) {
//			if (!patientResponse.getPassword ().equals (loginRequest.getPassword())) {
//				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
//			}
//			if (!patientResponse.isActivated()) {
//				return new ResponseEntity<> (HttpStatus.PRECONDITION_REQUIRED);
//			}
//			LoginResponseDTO retVal = new LoginResponseDTO ();
//			retVal.setId (patientResponse.getId ());
//			retVal.setUserRole (patientResponse.getRole ());
//			
//			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
//		}
//		
//		DoctorPOJO doctorResponse = loginService.getDoctorLoginResponse (loginRequest.getEmail());
//		if (doctorResponse != null) {
//			if (!doctorResponse.getPassword ().equals (loginRequest.getPassword ())) {
//				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
//			}
//			LoginResponseDTO retVal = new LoginResponseDTO ();
//			retVal.setId(doctorResponse.getId ());
//			retVal.setUserRole(doctorResponse.getRole ());
//		
//			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
//		}
//		
//		CentreAdministratorPOJO centreAdministratorResponse = loginService.getCentreAdministratorLoginResponse (loginRequest.getEmail ());
//		if (centreAdministratorResponse != null) {
//			if (!centreAdministratorResponse.getPassword ().equals (loginRequest.getPassword ())) {
//				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
//			}
//			LoginResponseDTO retVal = new LoginResponseDTO ();
//			retVal.setId(centreAdministratorResponse.getId ());
//			retVal.setUserRole(centreAdministratorResponse.getRole());
//			
//			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
//		}
//		
//		ClinicAdministratorPOJO clinicAdministratorResponse = loginService.getClinicAdministratorLoginResponse (loginRequest.getEmail ());
//		if (clinicAdministratorResponse != null) {
//			if (!clinicAdministratorResponse.getPassword ().equals (loginRequest.getPassword ())) {
//				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
//			}
//			LoginResponseDTO retVal = new LoginResponseDTO ();
//			retVal.setId(clinicAdministratorResponse.getId ());
//			retVal.setUserRole(clinicAdministratorResponse.getRole());
//			
//			System.out.println(loginRequest.getEmail() + "   " + loginRequest.getPassword());
//			
//			
//			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
//		}
//		
//		NursePOJO nurseResponse = loginService.getNurseLoginResponse (loginRequest.getEmail ());
//		if (nurseResponse != null) {
//			if (!nurseResponse.getPassword ().equals (loginRequest.getPassword ())) {
//				return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
//			}
//			LoginResponseDTO retVal = new LoginResponseDTO ();
//			retVal.setId(nurseResponse.getId ());
//			retVal.setUserRole(nurseResponse.getRole());
//			
//			return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
//		}
//		
//		return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
		
	}
	
}
