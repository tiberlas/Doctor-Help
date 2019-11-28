package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.ClinicService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/clinics")
public class ClinicController {

	@Autowired
	private ClinicService clinicService;
	
	@PostMapping(value = "/newClinic", consumes = "application/json")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<ClinicDTO> saveClinic(@RequestBody ClinicDTO clinicDTO) {
		ClinicPOJO clinic = new ClinicPOJO();
		clinic.setName(clinicDTO.getName());
		clinic.setAddress(clinicDTO.getAddress());
		clinic.setDescription(clinicDTO.getDescription());

		clinic = clinicService.save(clinic);
		return new ResponseEntity<>(new ClinicDTO(clinic) , HttpStatus.CREATED);
	}

	
	@GetMapping(value = "/all")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<List<ClinicDTO>> getAllClinics() {

		List<ClinicPOJO> clinics = clinicService.findAll();

		List<ClinicDTO> clinicDTO = new ArrayList<>();
		for (ClinicPOJO c : clinics) {
			clinicDTO.add(new ClinicDTO(c));
		} 
		
		return new ResponseEntity<>(clinicDTO, HttpStatus.OK);
	}
	
	@GetMapping(value = "/id={id}")
	public ResponseEntity<ClinicDTO> getOneCLinic(@PathVariable("id") Long id) {
		ClinicDTO finded = clinicService.findOneDTO(id);
		
		if(finded == null)
			return new ResponseEntity<ClinicDTO>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<ClinicDTO>(finded,  HttpStatus.OK);
	} 
	
	//FUCK PREBACENO U ROOMS CONTROLLER
	@GetMapping(value = "/{id}/rooms")
	public ResponseEntity<ClinicRoomListDTO> getCentreAdministratorsName(@PathVariable("id") Long id) {
		System.out.println("ROOMS");
		ClinicRoomListDTO ret = clinicService.getAllRooms(id);
		
		if(ret == null)
			return new ResponseEntity<ClinicRoomListDTO>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<ClinicRoomListDTO>(ret, HttpStatus.OK);
	}

}
