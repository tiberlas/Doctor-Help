package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.comon.Mail;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.dto.OperationRequestInfoDTO;
import com.ftn.dr_help.model.enums.OperationStatus;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
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
	
	@Autowired
	private Mail mailSender;
	
	public boolean doctorRequestAppointment(OperationRequestDTO request, String emailOfRequestingDoctor) {
		
		try {
			
			String freeSchedule = doctorService.checkOperationSchedue(request);
			if(freeSchedule.equals(request.getDateAndTimeString())) {
				DoctorPOJO requestedDoctor = doctorRepository.findOneByEmail(emailOfRequestingDoctor);
				DoctorPOJO doctor0 = doctorRepository.getOne(request.getDoctor0());
				DoctorPOJO doctor1 = doctorRepository.getOne(request.getDoctor1());
				DoctorPOJO doctor2 = doctorRepository.getOne(request.getDoctor2());
			 	
				AppointmentPOJO appointment = appointmentRepository.findOneById(request.getAppointmentId());
				
				ProceduresTypePOJO operationType = appointment.getProcedureType();
				
				PatientPOJO patient = appointment.getPatient();
				
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
				
				//poslati mejl adminu
				List<ClinicAdministratorPOJO> admins = doctor0.getClinic().getClinicAdminList();
				
				for(ClinicAdministratorPOJO admin : admins) {
					String requestingDoctorName = requestedDoctor.getFirstName() +" "+ requestedDoctor.getLastName();
					String dr0Name =  doctor0.getFirstName() + " " + doctor0.getLastName();
					String dr1Name = doctor1.getFirstName() + " " + doctor1.getLastName();
					String dr2Name = doctor2.getFirstName() + " " + doctor2.getLastName();
					mailSender.sendOperationRequestEmail(
							admin.getEmail(), 
							requestingDoctorName, 
							dr0Name, 
							dr1Name, 
							dr2Name, 
							operationType.getName(), 
							freeSchedule);
				}
				return true;
			}
			
			return false;
		} catch (Exception e) {
			System.out.println("GRESKA: ");
			e.printStackTrace();
			return false;
		}
	}
	
	public boolean deleteRequested(Long operationId) {
		try {
			
			OperationPOJO operation = operationRepository.getOne(operationId);
			Calendar start = (Calendar) operation.getDate().clone();
			
			//provera da li ima vise od 24h pre pocetka pregleda
			Calendar now = Calendar.getInstance();
			start.add(Calendar.DAY_OF_YEAR, -1); //24 sate pre operacije
			if( now.before(start)) {
				//moze da se obrise operacija
				operation.setDeleted(true);
				
				operationRepository.save(operation);
				return true;
			}
			
			return false;
		} catch(Exception e) {
			return false;
		}
	}
	
	public List<OperationRequestInfoDTO> getAllRequests(String adminEmail) {
		try {
			
			List<OperationPOJO> finded = operationRepository.getAllOperationRequestsForAdmin(adminEmail);
			List<OperationRequestInfoDTO> operations = new ArrayList<>();
			
			for(OperationPOJO operation : finded) {
				operations.add(new OperationRequestInfoDTO(
						operation.getId(), 
						dateConvertor.dateForFrontEndString(operation.getDate()), 
						operation.getOperationType().getName(), 
						operation.getOperationType().getId(), 
						operation.getFirstDoctor().getEmail(), 
						operation.getSecondDoctor().getEmail(), 
						operation.getThirdDoctor().getEmail(), 
						operation.getPatient().getEmail()));
			}
			
			return operations;
		} catch(Exception e) {
			return null;
		}
	}
	
	public OperationRequestInfoDTO getOneRequests(Long operaionId) {
		try {
			OperationPOJO finded = operationRepository.getOne(operaionId);
			OperationRequestInfoDTO operation = new OperationRequestInfoDTO(
					finded.getId(), 
					dateConvertor.dateForFrontEndString(finded.getDate()), 
					finded.getOperationType().getName(), 
					finded.getOperationType().getId(), 
					finded.getFirstDoctor().getEmail(), 
					finded.getSecondDoctor().getEmail(), 
					finded.getThirdDoctor().getEmail(), 
					finded.getPatient().getEmail());
			
			return operation;
		} catch(Exception e) {
			return null;
		}
	}
}
