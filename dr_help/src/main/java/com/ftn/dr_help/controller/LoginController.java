package com.ftn.dr_help.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.LoginRequestDTO;
import com.ftn.dr_help.dto.LoginResponseDTO;
import com.ftn.dr_help.model.enums.RoleEnum;
 
@RestController
@RequestMapping (value = "/api")
@CrossOrigin (origins="http://localhost:3000")
public class LoginController {
	
	@PostMapping (value = "/login", consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<LoginResponseDTO> login (@RequestBody  LoginRequestDTO loginRequest){

		System.out.println("Email: " + loginRequest.getEmail());
		System.out.println("Password: " + loginRequest.getPassword());
		
		LoginResponseDTO retVal = new LoginResponseDTO ();
		retVal.setUserRole(RoleEnum.DOCTOR);
		
		return new ResponseEntity<LoginResponseDTO> (retVal, HttpStatus.OK);
	}
	
}
