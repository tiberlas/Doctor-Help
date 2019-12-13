package com.ftn.dr_help.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.MedicalStaffDTO;
import com.ftn.dr_help.service.MedicalStuffService;

@RestController
@RequestMapping(value = "api/medical+stuff")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicalStuffControler {
	
	@Autowired
	private MedicalStuffService service;
	
	@GetMapping(value = "/clinic={clinic_id}/all")
	public ResponseEntity<List<MedicalStaffDTO>> getAll(@PathVariable("clinic_id") Long clinicId) {
		List<MedicalStaffDTO> finded = service.findAll(clinicId);
		
		if(finded == null || finded.isEmpty())
			return new ResponseEntity<List<MedicalStaffDTO>>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<MedicalStaffDTO>>(finded,  HttpStatus.OK);
		
	}

}
