package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(value = "/api/clinics")
public class ClinicController {

	@Autowired
	private ClinicService clinicService;
	
	@PostMapping(value = "/newClinic", consumes = "application/json")
	public ResponseEntity<ClinicDTO> saveClinic(@RequestBody ClinicDTO courseDTO) {
		System.out.println("works");
		ClinicPOJO clinic = new ClinicPOJO();
		clinic.setName(courseDTO.getName());
		clinic.setAddress(courseDTO.getAddress());
		clinic.setDescription(courseDTO.getDescription());

		clinic = clinicService.save(clinic);
		return new ResponseEntity<>(new ClinicDTO(clinic), HttpStatus.CREATED);
	}
	
	@CrossOrigin(value= "/api/**")
	public void corsHeaders(HttpServletResponse response) {
	    System.out.println("got in here");
		response.addHeader("Access-Control-Allow-Origin", "*");
	    response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	    response.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
	    response.addHeader("Access-Control-Max-Age", "3600");
	}
	
	@GetMapping(value = "/all")
	public ResponseEntity<List<ClinicDTO>> getAllClinics() {

		List<ClinicPOJO> clinics = clinicService.findAll();

		List<ClinicDTO> clinicDTO = new ArrayList<>();
		for (ClinicPOJO c : clinics) {
			clinicDTO.add(new ClinicDTO(c));
		}
		
		return new ResponseEntity<>(clinicDTO, HttpStatus.OK);
		
//		List<Course> courses = courseService.findAll();
//
//		// convert courses to DTOs
//		List<CourseDTO> coursesDTO = new ArrayList<>();
//		for (Course s : courses) {
//			coursesDTO.add(new CourseDTO(s));
//		}
//
//		return new ResponseEntity<>(coursesDTO, HttpStatus.OK);
	}
	
	
}
