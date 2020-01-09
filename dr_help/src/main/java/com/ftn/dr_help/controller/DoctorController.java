package com.ftn.dr_help.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.comon.Mail;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorListingDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.DoctorProfilePreviewDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffSaveingDTO;
import com.ftn.dr_help.dto.PatientHealthRecordDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.service.DoctorService;

@RestController
@RequestMapping(value = "api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

	@Autowired
	private DoctorService service;
	
	@Autowired
	private CurrentUser currentUser;
	
	@Autowired
	private Mail mailSender;
	
	@GetMapping(value = "/clinic={clinic_id}/all")
	public ResponseEntity<List<DoctorProfileDTO>> getAllRooms(@PathVariable("clinic_id") Long clinic_id) {
		List<DoctorProfileDTO> finded = service.findAll(clinic_id);
		
		if(finded == null || finded.isEmpty())
			return new ResponseEntity<List<DoctorProfileDTO>>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<DoctorProfileDTO>>(finded,  HttpStatus.OK);
	}
	
	@GetMapping(value = "/clinic={clinic_id}/one/doctor={doctor_id}")
	public ResponseEntity<DoctorProfileDTO> getOneRooms(@PathVariable("clinic_id") Long clinic_id, @PathVariable("doctor_id") Long doctor_id) {
		DoctorProfileDTO finded = service.findOne(clinic_id, doctor_id);
		
		if(finded == null)
			return new ResponseEntity<DoctorProfileDTO>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<DoctorProfileDTO>(finded,  HttpStatus.OK);
	}
	
	@GetMapping(value = "/profile")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<MedicalStaffProfileDTO> findProfile() {
		String email = currentUser.getEmail();
		
		MedicalStaffProfileDTO ret = service.findByEmail(email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStaffProfileDTO>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<MedicalStaffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<MedicalStaffProfileDTO> putAdminProfile(@RequestBody UserDetailDTO doctor) {
		String email = currentUser.getEmail();
		
		MedicalStaffProfileDTO ret = service.save(doctor, email);
		
		if(ret == null) {
			return new ResponseEntity<MedicalStaffProfileDTO>(HttpStatus.NOT_ACCEPTABLE); //406
		}
		
		return new ResponseEntity<MedicalStaffProfileDTO>(ret, HttpStatus.OK);
	}
	
	@PutMapping(value = "/change/password", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<String> putAdminPassword(@RequestBody ChangePasswordDTO passwords) {
		String email = currentUser.getEmail();
		
		boolean ret = service.changePassword(passwords, email);
		
		if(ret) {
			return new ResponseEntity<String>("changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("not changed", HttpStatus.NOT_ACCEPTABLE);
		}
		
	} 
	
	@GetMapping (value = "/listing/{clinic_id}/{appointment_type}/{appointment_date}")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<List<DoctorListingDTO>> getDoctorListing (@PathVariable("clinic_id") Long clinicId, 
				@PathVariable("appointment_type") String appointmentType, @PathVariable("appointment_date") String appointmentDate) throws ParseException {

		System.out.println("Appointment type: " + appointmentType);
		System.out.println("Clinic id: " + clinicId);
		System.out.println("Date: " + appointmentDate);
		
		if (appointmentType.equals("unfiltered") || appointmentDate.contentEquals("unfiltered")) {
			return new ResponseEntity<> (service.filterByClinic(clinicId), HttpStatus.OK);
		} else {
			List<DoctorListingDTO> doctors = service.filterByClinicDateProcedureType(clinicId, appointmentType.replace('_', ' '), appointmentDate);
			
			return new ResponseEntity<> (doctors, HttpStatus.OK);
		}
	}
	
	@GetMapping (value = "/preview/{id}")
	@PreAuthorize("hasAuthority('PATIENT')")
	public ResponseEntity<DoctorProfilePreviewDTO> getProfilePreview (@PathVariable("id") Long id) {
		DoctorProfilePreviewDTO retVal = service.getProfilePreview(id);
		if (retVal == null) {
			return new ResponseEntity<> (HttpStatus.NOT_FOUND);
		} 
		
		return new ResponseEntity<> (retVal, HttpStatus.OK);
	}
	
	@GetMapping(value = "/appointment={id}/health_record") 
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<PatientHealthRecordDTO> findPatientHealthRecord(@PathVariable("id") Long id) {
		
		PatientHealthRecordDTO record = service.findPatientHealthRecord(id);
		System.out.println("record basic info" + record.getLastName());
		
		return new ResponseEntity<PatientHealthRecordDTO> (record, HttpStatus.OK);
	}

	@PostMapping(value = "/new+doctor", consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
	public ResponseEntity<String> createNurse(@RequestBody MedicalStaffSaveingDTO newDoctor) {
		String email = currentUser.getEmail();
		
		boolean ret = service.save(newDoctor, email);
		
		if(ret) {
			mailSender.sendAccountInfoEmail(newDoctor.getEmail(), "DoctorHelp", newDoctor.getFirstName(), newDoctor.getLastName(), RoleEnum.DOCTOR);
			return new ResponseEntity<String>("created", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String>("not", HttpStatus.NOT_ACCEPTABLE);
		}
		
	}
	
	@DeleteMapping(value = "/delete/id={id}")
	@PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
	public ResponseEntity<String> deleteNurse(@PathVariable("id") Long id) {
		
		boolean ret = service.delete(id);
		
		if(ret) {
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("not", HttpStatus.NOT_ACCEPTABLE);
		}
		
	}
	
	@GetMapping(value = "/schedules/first_free", produces = "application/json")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<String> getFirstFreeSchedule() {
		String email = currentUser.getEmail();
		
		String date = service.findFirstFreeSchedue(email);
		
		if(date == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(date, HttpStatus.OK);
	}
	
}
