package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.HealthRecordDTO;
import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientHistoryDTO;
import com.ftn.dr_help.dto.PatientNameDTO;
import com.ftn.dr_help.dto.PatientProfileDTO;
import com.ftn.dr_help.dto.PatientRequestDTO;
import com.ftn.dr_help.dto.PerscriptionDisplayDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.service.PatientService;

@RestController
@RequestMapping (value = "api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private CurrentUser currentUser;
	
	@GetMapping(value = "/all/names")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<List<PatientNameDTO>> getAllPatientNames() {

		List<PatientNameDTO> ret = patientService.findAllNames();
		
		if(ret == null) {
			return new ResponseEntity<List<PatientNameDTO>>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<List<PatientNameDTO>>(ret, HttpStatus.OK);
	}
	
	@GetMapping(value = "/id={id}/profile")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<PatientDTO> getPatientProfile(@PathVariable("id") Long id ) {

		PatientDTO ret = patientService.findById(id);
		
		if(ret == null) {
			return new ResponseEntity<PatientDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<PatientDTO>(ret, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/all")
	public ResponseEntity<List<PatientDTO>> getAllPatients() {

		List<PatientPOJO> patients = patientService.findAll();

		List<PatientDTO> patientDTO = new ArrayList<>();
		for (PatientPOJO p : patients) {
			patientDTO.add(new PatientDTO(p));
		}
		
		return new ResponseEntity<>(patientDTO, HttpStatus.OK);
	}
	
	
	@PutMapping(value = "/confirmAccount", consumes = "application/json")
	public ResponseEntity<PatientPOJO> confirmPatientAccount(@RequestBody PatientRequestDTO patient) {
		//String email = currentUser.getEmail();
		
		PatientPOJO p = patientService.findPatientByEmail(patient.getEmail());
		
		if(p == null) {
			return new ResponseEntity<PatientPOJO>(HttpStatus.NOT_FOUND);
		}
		
		p.setActivated(true);
		patientService.save(p);
		
		return new ResponseEntity<PatientPOJO>(p, HttpStatus.OK);
	}
	
	@GetMapping (value="/profile")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<PatientProfileDTO> getPatientProfile1 () {
		String email = currentUser.getEmail();
		PatientPOJO retVal = patientService.findPatientByEmail(email);
		
		if (retVal == null) {
			return new ResponseEntity<> (HttpStatus.UNAUTHORIZED);
		}
		PatientProfileDTO ret = new PatientProfileDTO(retVal);
		
		return new ResponseEntity<PatientProfileDTO> (ret, HttpStatus.OK);
	}
	
	@PutMapping (value="/change")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<PatientProfileDTO> updateProfile (@RequestBody PatientProfileDTO profileUpdate) {
		String email = currentUser.getEmail();
		PatientProfileDTO retVal = patientService.save(profileUpdate, email);
		if (retVal == null) {
			return new ResponseEntity<> (HttpStatus.NOT_ACCEPTABLE);
		}
		
		return new ResponseEntity<PatientProfileDTO> (retVal, HttpStatus.OK);
	}
	
	@GetMapping (value="/health_record")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<HealthRecordDTO> getHealthRecord () {
		HealthRecordDTO retVal = patientService.getHealthRecord (currentUser.getEmail());
		if (retVal == null) {
			return new ResponseEntity<HealthRecordDTO>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<HealthRecordDTO> (retVal, HttpStatus.OK);
	}
	
	@GetMapping (value="/history")
	@PreAuthorize("hasAuthority('PATIENT')")	
	public ResponseEntity<List<PatientHistoryDTO>> getHistory () {
		List<PatientHistoryDTO> retVal = patientService.getHistory(currentUser.getEmail());
		System.out.println("Zilav sam!!!1!");
		if (retVal == null) {
			retVal = new ArrayList<PatientHistoryDTO> ();
			retVal.add(new PatientHistoryDTO ((long) 0, "", "", "", "", ""));
		}
		return new ResponseEntity<> (retVal, HttpStatus.OK);
	}
	
	@GetMapping (value = "/examinationReportId={examinationReportId}/perscription")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<PerscriptionDisplayDTO> getPerscription (@PathVariable("examinationReportId") Long examinationReportId) {
		PerscriptionDisplayDTO retVal = patientService.getPerscription(examinationReportId);
		
		if (retVal == null) {
			return new ResponseEntity<> (HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<> (retVal, HttpStatus.OK);
	}
	
}
