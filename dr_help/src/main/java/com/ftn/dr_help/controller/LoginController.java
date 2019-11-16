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
import com.ftn.dr_help.model.enums.RoleEnum;
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
		
		LoginResponseDTO response = loginService.getLoginResponse(loginRequest.getEmail());

		if (response == null) {
			System.out.println("Nemam response");
		}
		else {
			System.out.println("Imam response");
		}
		
		return new ResponseEntity<LoginResponseDTO> (response, HttpStatus.OK);
	}
	
}
