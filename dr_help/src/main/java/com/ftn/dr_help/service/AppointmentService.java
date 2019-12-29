package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.DoctorAppointmentDTO;
import com.ftn.dr_help.dto.ExaminationReportDTO;
import com.ftn.dr_help.model.enums.AppointmentStateEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DiagnosisPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.ExaminationReportPOJO;
import com.ftn.dr_help.model.pojo.MedicationPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.PerscriptionPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.model.pojo.TherapyPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.DiagnosisRepository;
import com.ftn.dr_help.repository.ExaminationReportRepository;
import com.ftn.dr_help.repository.MedicationRepository;
import com.ftn.dr_help.repository.PerscriptionRepository;
import com.ftn.dr_help.repository.TherapyRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DiagnosisRepository diagnosisRepository;
	
	@Autowired
	private MedicationRepository medicationRepository;
	
	@Autowired
	private PerscriptionRepository perscriptionRepository;
	
	@Autowired
	private ExaminationReportRepository examinationRepository;
	
	@Autowired
	private TherapyRepository therapyRepository;

	public List<DoctorAppointmentDTO> findDoctorAppointments(Long doctor_id) {
		
		List<AppointmentPOJO> list = appointmentRepository.findDoctorAppointments(doctor_id);
		
		List<DoctorAppointmentDTO> appointments = new ArrayList<DoctorAppointmentDTO>();
		
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
			if(!appointmentPOJO.isDeleted()) {
				System.out.println("-------------------" + i);
				DoctorAppointmentDTO dto = convertAppointmentToDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
			}
		}
		
		
		
		return appointments;
	}
	
	
	public AppointmentPOJO finishAppointment(Long appointmentId, ExaminationReportDTO dto) {
		
		AppointmentPOJO app = appointmentRepository.findOneById(appointmentId);
		
		PerscriptionPOJO perscription = new PerscriptionPOJO();
		DiagnosisPOJO diagnosis = diagnosisRepository.findOneByDiagnosis(dto.getDiagnosis());
		perscription.setDiagnosis(diagnosis);
		perscription.setSigningNurse(null);
		
		List<MedicationPOJO> medicationList = new ArrayList<MedicationPOJO>();
		for (String medication : dto.getMedicationList()) {
			MedicationPOJO med = medicationRepository.findOneByMedicationName(medication).orElse(null);
			medicationList.add(med);
			System.out.println("Added medication: "+ med.getMedicationName());
		}
		
		perscription.setMedicationList(medicationList);
		perscription.setMedicationList(medicationList);
		
		for (MedicationPOJO medicationPOJO : medicationList) {
			System.out.println("THE MEDS ARE: " + medicationPOJO.getMedicationName());
		}
		
		TherapyPOJO therapy = new TherapyPOJO();
		therapy.setAdvice(dto.getNote());
		perscription.setTherapy(therapy);
		
		ExaminationReportPOJO report = new ExaminationReportPOJO();
		report.setAppointment(app);
		report.setHealthRecord(app.getPatient().getHealthRecord());
		report.setPerscription(perscription);
		report.setClinic(app.getDoctor().getClinic());
		
		examinationRepository.save(report);

		perscription.setExaminationReport(report);
		perscription.setDiagnosis(diagnosis);
		
		perscriptionRepository.save(perscription);
		
		therapyRepository.save(therapy);
		
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(dto.getDateStart());
		app.setDate(cal);
		
		
		app.setExaminationReport(report);
		app.setStatus(AppointmentStateEnum.DONE);
		
		appointmentRepository.save(app);
		
		return app;
	}
	
	
	private DoctorAppointmentDTO convertAppointmentToDTO(AppointmentPOJO appointment) {
		
		DoctorAppointmentDTO dto = new DoctorAppointmentDTO();
		
		DoctorPOJO doctor = appointment.getDoctor();
		System.out.println("DOCA JE" + doctor.getFirstName());
		
		PatientPOJO patient = appointment.getPatient();
		if(patient == null) {
			dto.setPatientFirstName("-");
			dto.setPatientLastName("-");
			
		}
		else {
			System.out.println("PACIJENT JE:" + patient.getFirstName());
			dto.setPatientFirstName(patient.getFirstName());
			dto.setPatientLastName(patient.getLastName());
		}
		
		ProceduresTypePOJO pt = appointment.getProcedureType();
		dto.setProcedureName(pt.getName());
		
		dto.setStartDate(appointment.getDate().getTime());
		System.out.println("START IS" + appointment.getDate().getTime());
		
		Calendar end = Calendar.getInstance(); // creates calendar
		end.setTime(appointment.getDate().getTime()); // sets calendar time/date
		
		Calendar duration = Calendar.getInstance();
		duration.setTime(pt.getDuration());
		end.add(Calendar.HOUR_OF_DAY, duration.get(Calendar.HOUR)); //dodaje sate
		end.add(Calendar.MINUTE, duration.get(Calendar.MINUTE)); //dodaje minute
		System.out.println("AND END IS: " + end.getTime());
		dto.setEndDate(end.getTime());
		
		
		dto.setProcedureName(pt.getName());
		
		dto.setPrice(String.valueOf(appointment.getProcedureType().getPrice()));
		System.out.println("PRICE IS: " + dto.getPrice());
		dto.setDiscount(String.valueOf(appointment.getDiscount()));
		System.out.println("DISCOUNT IS: " + dto.getDiscount());
		dto.setStatus(String.valueOf(appointment.getStatus()));
		
		dto.setIsOperation(pt.isOperation());
		dto.setRoomName(appointment.getRoom().getName());
		dto.setRoomNumber(String.valueOf(appointment.getRoom().getNumber()));
		
		dto.setAppointment_id(appointment.getId());
		
		dto.setInsuranceNumber(String.valueOf(patient.getInsuranceNumber()));
		
		return dto;
		
	}
	

}
