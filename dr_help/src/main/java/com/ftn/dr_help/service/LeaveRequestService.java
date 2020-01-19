package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.leave_requests.LeaveRequestDTO;
import com.ftn.dr_help.model.enums.LeaveStatusEnum;
import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.LeaveRequestPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.repository.LeaveRequestRepository;
import com.ftn.dr_help.repository.NurseRepository;

@Service
public class LeaveRequestService {

	@Autowired
	private LeaveRequestRepository leaveRequestRepository;
	
	@Autowired
	private NurseRepository nurseRepository;
	
	
	public boolean addNurseRequest(Long nurse_id, LeaveRequestDTO dto) {
		
		LeaveRequestPOJO leaveRequestPOJO = new LeaveRequestPOJO();
		NursePOJO nurse = nurseRepository.findOneById(nurse_id);
		
		if(nurse.isDeleted()) {
			System.out.println("Nurse is deleted.");
			return false;
		}
		
		leaveRequestPOJO.setNurse(nurse); 
		leaveRequestPOJO.setDoctor(null);
		
		leaveRequestPOJO.setRequestNote(dto.getNote());
		leaveRequestPOJO.setLeaveType(dto.getLeaveType());
		leaveRequestPOJO.setStaffRole(RoleEnum.NURSE);

		Calendar firstDay = Calendar.getInstance(); //set calendar instance based on dto date
		firstDay.setTime(dto.getStartDate()); 
		leaveRequestPOJO.setFirstDay(firstDay);
		
		Calendar lastDay = Calendar.getInstance();
		lastDay.setTime(dto.getEndDate());
		leaveRequestPOJO.setLastDay(lastDay);
		leaveRequestPOJO.setLeaveStatus(LeaveStatusEnum.REQUESTED);

		
		leaveRequestRepository.save(leaveRequestPOJO);
		System.out.println("Added new leave request for NURSE ID " + nurse_id + " FIRST_NAME: " + nurse.getFirstName());
		
		return true;
	}
	
	
	
	public List<LeaveRequestDTO> getNurseRequests(Long nurse_id) {
		List<LeaveRequestPOJO> list = leaveRequestRepository.getNurseLeaveRequests(nurse_id);
		
		List<LeaveRequestDTO> dtoList = new ArrayList<LeaveRequestDTO>();
		for (LeaveRequestPOJO leaveRequestPOJO : list) {
			LeaveRequestDTO dto = convertRequestToDTO(leaveRequestPOJO, RoleEnum.NURSE);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	
	public List<LeaveRequestDTO> getDoctorRequests(Long doctor_id) {
		List<LeaveRequestPOJO> list = leaveRequestRepository.getDoctorLeaveRequests(doctor_id);
		
		List<LeaveRequestDTO> dtoList = new ArrayList<LeaveRequestDTO>();
		for (LeaveRequestPOJO leaveRequestPOJO : list) {
			LeaveRequestDTO dto = convertRequestToDTO(leaveRequestPOJO, RoleEnum.NURSE);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	
	private LeaveRequestDTO convertRequestToDTO(LeaveRequestPOJO request, RoleEnum role) {
		
			LeaveRequestDTO dto = new LeaveRequestDTO();
			dto.setStartDate(request.getFirstDay().getTime());
			dto.setEndDate(request.getLastDay().getTime());
			dto.setLeaveType(request.getLeaveType());
			dto.setNote(request.getRequestNote());
			dto.setLeaveStatus(request.getLeaveStatus());
			
			return dto;
		}
}
