package com.ftn.dr_help.controller;

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

import com.ftn.dr_help.dto.leave_requests.LeaveRequestDTO;
import com.ftn.dr_help.service.LeaveRequestService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/leave-requests")
public class LeaveRequestController {
	
	@Autowired
	private LeaveRequestService leaveRequestService;
	
	
	@PostMapping(value="/add/nurse={id}")
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<LeaveRequestDTO> addNurseRequest(@PathVariable("id") Long nurse_id, @RequestBody LeaveRequestDTO leaveRequestDTO) {
		
		boolean ret = leaveRequestService.addNurseRequest(nurse_id, leaveRequestDTO);
		
		if(ret) {
			return new ResponseEntity<LeaveRequestDTO>(leaveRequestDTO, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	
	@PostMapping(value="/add/doctor={id}")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<LeaveRequestDTO> addDoctorRequest(@PathVariable("id") Long doctor_id, @RequestBody LeaveRequestDTO leaveRequestDTO) {
		
		boolean ret = leaveRequestService.addDoctorRequest(doctor_id, leaveRequestDTO);
		
		if(ret) {
			return new ResponseEntity<LeaveRequestDTO>(leaveRequestDTO, HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@GetMapping(value="/get-all/nurse={id}")
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<List<LeaveRequestDTO>> getNurseRequests(@PathVariable("id") Long nurse_id) {
		
		List<LeaveRequestDTO> list = leaveRequestService.getNurseRequests(nurse_id);
		
		return new ResponseEntity<List<LeaveRequestDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value="/get-all/doctor={id}")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<List<LeaveRequestDTO>> getDoctorRequests(@PathVariable("id") Long doctor_id) {
		
		List<LeaveRequestDTO> list = leaveRequestService.getDoctorRequests(doctor_id);
		
		return new ResponseEntity<List<LeaveRequestDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value="/get-approved/nurse={id}")
	@PreAuthorize("hasAuthority('NURSE')")
	public ResponseEntity<List<LeaveRequestDTO>> getApprovedNurseRequests(@PathVariable("id") Long nurse_id) {
		
		List<LeaveRequestDTO> list = leaveRequestService.getApprovedNurseRequests(nurse_id);
		
		return new ResponseEntity<List<LeaveRequestDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value="/get-approved/doctor={id}")
	@PreAuthorize("hasAuthority('DOCTOR')")
	public ResponseEntity<List<LeaveRequestDTO>> getApprovedDoctorRequests(@PathVariable("id") Long doctor_id) {
		
		List<LeaveRequestDTO> list = leaveRequestService.getApprovedDoctorRequests(doctor_id);
		
		return new ResponseEntity<List<LeaveRequestDTO>>(list, HttpStatus.OK);
	}

}
