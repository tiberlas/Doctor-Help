package com.ftn.dr_help.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.ClinicListingDTO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.service.ClinicService;
import com.ftn.dr_help.service.ProcedureTypeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/clinics")
public class ClinicController {

	@Autowired
	private ClinicService clinicService;
	
	@Autowired
	private CurrentUser currentUser;
	
	@Autowired
	private ProcedureTypeService procedureTypeService;
	
	@PostMapping(value = "/newClinic", consumes = "application/json")
	@PreAuthorize("hasAuthority('CENTRE_ADMINISTRATOR')")
	public ResponseEntity<ClinicDTO> saveClinic(@RequestBody ClinicDTO clinicDTO) {
		
		ClinicPOJO c = clinicService.findByName(clinicDTO.getName());
		
		if( c != null) 
		{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		ClinicPOJO clinic = new ClinicPOJO();
		clinic.setName(clinicDTO.getName());
		clinic.setAddress(clinicDTO.getAddress());
		clinic.setCity(clinicDTO.getCity());
		clinic.setState(clinicDTO.getState());
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

	@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
	public ResponseEntity<ClinicDTO> changeClinicProfile(@RequestBody ClinicDTO newClinic) {
		String email = currentUser.getEmail();

		ClinicDTO ret = clinicService.save(newClinic, email);
		
		if(ret == null) {
			return new ResponseEntity<ClinicDTO>(HttpStatus.NOT_ACCEPTABLE); //406
		}
		
		return new ResponseEntity<ClinicDTO>(ret, HttpStatus.OK);
	}

	// Displaying a list of clinics to a patient using this method instead of get all,
	// Even though their code is identical at this point;
	// In later sprints I intend to expand this one with filters
	@GetMapping (value = "/listing")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity <ClinicListingDTO> getClinicListing () {
		System.out.println("Patient listing says hi");
		
		List<ClinicPOJO> clinics = clinicService.findAll();

		List<ClinicDTO> clinicDTO = new ArrayList<>();
		for (ClinicPOJO c : clinics) {
			clinicDTO.add(new ClinicDTO(c));
		} 
		
		List<String> procedureTypes = procedureTypeService.getProcedureTypes();

		System.out.println("***********************************************************************");
		System.out.println("Izlistavam klinike");
		if (procedureTypes == null) {
			System.out.println("Nisam nista ucitao :P");
		} else {
			for (String s : procedureTypes) {
				System.out.println(s);
			}
		}
		System.out.println("Sada sve spojeno");
		System.out.println("***********************************************************************");
		
		ClinicListingDTO retVal = new ClinicListingDTO (clinicDTO, procedureTypes);
		
		return new ResponseEntity<>(retVal, HttpStatus.OK);
	}
	
}
