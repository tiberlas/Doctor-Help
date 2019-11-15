package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.CentreAdminDTO;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.service.CentreAdministratorService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/centreAdmins")
public class CentreAdministratorController {
	
	@Autowired
	private CentreAdministratorService centreAdministratorService;

	
	@PostMapping(value = "/newAdmin", consumes = "application/json")
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
	
}
