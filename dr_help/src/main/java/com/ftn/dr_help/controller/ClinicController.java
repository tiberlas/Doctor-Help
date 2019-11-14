package com.ftn.dr_help.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.ClinicService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/clinics")
public class ClinicController {

	@Autowired
	private ClinicService clinicService;
	
	@PostMapping(value = "/newClinic", consumes = "application/json")
	public ResponseEntity<ClinicDTO> saveClinic(@RequestBody ClinicDTO clinicDTO) {
//		for (ClinicDTO c : clinicDTO.values()) {
//			System.out.println(c);
//		}
//		System.out.println(clinicDTO.getAddress());
//		//System.out.println(clinicDTO.containsValue(arg0));
//		System.out.println("works" + clinicDTO.getName() + " " + clinicDTO.getAddress() + " " + clinicDTO.getDescription());
		ClinicPOJO clinic = new ClinicPOJO();
		clinic.setName(clinicDTO.getName());
		clinic.setAddress(clinicDTO.getAddress());
		clinic.setDescription(clinicDTO.getDescription());

		clinic = clinicService.save(clinic);
		return new ResponseEntity<>(new ClinicDTO(clinic) , HttpStatus.CREATED);
	}

	
	@GetMapping(value = "/all")
	public ResponseEntity<List<ClinicDTO>> getAllClinics() {

		List<ClinicPOJO> clinics = clinicService.findAll();

		List<ClinicDTO> clinicDTO = new ArrayList<>();
		for (ClinicPOJO c : clinics) {
			clinicDTO.add(new ClinicDTO(c));
		}
		
		return new ResponseEntity<>(clinicDTO, HttpStatus.OK);
	}
	
	
}
