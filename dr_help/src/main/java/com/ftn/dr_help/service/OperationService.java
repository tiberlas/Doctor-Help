package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.model.enums.OperationStatus;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.OperationPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.OperationRepository;
import com.ftn.dr_help.repository.PatientRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;

@Service
public class OperationService {

	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private OperationRepository operationRepository;
	
	@Autowired
	private ProcedureTypeRepository operationTypeRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private DateConverter dateConvertor;
	
	public boolean doctorRequestAppointment(OperationRequestDTO request, String emailOfRequestingDoctor) {
		
		try {
			
			String freeSchedule = doctorService.checkOperationSchedue(request);
			if(freeSchedule.equals(request.getDateAndTimeString())) {
				DoctorPOJO requestedDoctor = doctorRepository.findOneByEmail(emailOfRequestingDoctor);
				DoctorPOJO doctor0 = doctorRepository.getOne(request.getDoctor0());
				DoctorPOJO doctor1 = doctorRepository.getOne(request.getDoctor1());
				DoctorPOJO doctor2 = doctorRepository.getOne(request.getDoctor2());
			 	
				ProceduresTypePOJO operationType = operationTypeRepository.getOne(request.getOperationType());
				
				PatientPOJO patient = patientRepository.getOne(request.getPatientId());
				
				if(requestedDoctor == null || doctor0 == null || doctor1 == null || doctor2 == null || operationType == null || patient == null) {
					return false;
				}
				
				OperationPOJO operation = new OperationPOJO();
				operation.setDate(dateConvertor.stringToDate(freeSchedule));
				operation.setDeleted(false);
				operation.setRequestedDoctor(requestedDoctor);
				operation.setFirstDoctor(doctor0);
				operation.setSecondDoctor(doctor1);
				operation.setThirdDoctor(doctor2);
				operation.setPatient(patient);
				operation.setOperationType(operationType);
				operation.setStatus(OperationStatus.REQUESTED);
				
				operationRepository.save(operation);
				return true;
			}
			
			return false;
		} catch (Exception e) {
			return false;
		}
	}
}
