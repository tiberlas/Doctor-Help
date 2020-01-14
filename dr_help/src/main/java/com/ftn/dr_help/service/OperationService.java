package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.model.pojo.OperationPOJO;
import com.ftn.dr_help.repository.OperationRepository;

@Service
public class OperationService {

	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private OperationRepository operationRepository;
	
	@Autowired
	private DateConverter dateConvertor;
	
	public boolean doctorRequestAppointment(OperationRequestDTO request) {
		
		try {
			
			String freeSchedule = doctorService.checkOperationSchedue(request);
			if(freeSchedule.equals(request.getDateAndTimeString())) {
				OperationPOJO operation = new OperationPOJO();
				operation.setDate(dateConvertor.stringToDate(freeSchedule));
				operation.setDeleted(false);
				//treba podesiti operation saad
				
				operationRepository.save(operation);
				return true;
			}
			
			return false;
		} catch (Exception e) {
			return false;
		}
	}
}
