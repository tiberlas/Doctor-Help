package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.service.MedicationService;

@RestController
@RequestMapping (value = "api/Medication")
public class MedicationController {

	@Autowired
	private MedicationService medicationService;
	
}
