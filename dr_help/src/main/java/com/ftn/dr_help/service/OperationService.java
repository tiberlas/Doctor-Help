package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.model.enums.OperationStatus;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.OperationPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.OperationRepository;

@Service
public class OperationService {

	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private OperationRepository operationRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DateConverter dateConvertor;
	
	public boolean doctorRequestAppointment(OperationRequestDTO request, String emailOfRequestingDoctor) {
		
		try {
			
			String freeSchedule = doctorService.checkOperationSchedue(request);
			System.out.println(freeSchedule);
			System.out.println(request.getDateAndTimeString());
			if(freeSchedule.equals(request.getDateAndTimeString())) {
				DoctorPOJO requestedDoctor = doctorRepository.findOneByEmail(emailOfRequestingDoctor);
				DoctorPOJO doctor0 = doctorRepository.getOne(request.getDoctor0());
				DoctorPOJO doctor1 = doctorRepository.getOne(request.getDoctor1());
				DoctorPOJO doctor2 = doctorRepository.getOne(request.getDoctor2());
			 	
				AppointmentPOJO appointment = appointmentRepository.findOneById(request.getAppointmentId());
				
				System.out.println("appointment");
				System.out.println(appointment.getId());
				System.out.println(request.getAppointmentId());
				
				ProceduresTypePOJO operationType = appointment.getProcedureType();
				
				PatientPOJO patient = appointment.getPatient();
				
				if(requestedDoctor == null || doctor0 == null || doctor1 == null || doctor2 == null || operationType == null || patient == null) {
					System.out.println("NULL VREDNOST");
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
			
			System.out.println("VREME ME JEBE");
			return false;
		} catch (Exception e) {
			System.out.println("GRESKA: ");
			e.printStackTrace();
			return false;
		}
	}
}
