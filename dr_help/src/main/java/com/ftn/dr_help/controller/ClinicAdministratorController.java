package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.service.ClinicAdministratorService;

@RestController
@RequestMapping(value = "api/clinicAdmins")
public class ClinicAdministratorController {

		@Autowired
		private ClinicAdministratorService clinicAdministratorService;

		@GetMapping(value = "/all")
		public ResponseEntity<List<ClinicAdministratorPOJO>> getAllTeachers() {

			ClinicAdministratorPOJO c = new ClinicAdministratorPOJO("password1", "mika@email.com", "Mika", "Peric", "Bul smrti 1", "Novi Sad", "Serbia", "0643312351", RoleEnum.CLINICAL_ADMINISTRATOR, Calendar.getInstance());
			//ClinicAdministratorService cas = new ClinicAdministratorService();
			clinicAdministratorService.save(c);
			List<ClinicAdministratorPOJO> admins = clinicAdministratorService.findAll();

			
			// convert teachers to DTOs
			List<ClinicAdministratorPOJO> adminDTO = new ArrayList<>();
			for (ClinicAdministratorPOJO s : admins) {
				adminDTO.add(s);
			}

			return new ResponseEntity<>(adminDTO, HttpStatus.OK);
		}

	
}