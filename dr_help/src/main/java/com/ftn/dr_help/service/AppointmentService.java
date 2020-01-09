package com.ftn.dr_help.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.DoctorAppointmentDTO;
import com.ftn.dr_help.dto.ExaminationReportDTO;
import com.ftn.dr_help.dto.nurse.NurseAppointmentDTO;
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
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.ExaminationReportRepository;
import com.ftn.dr_help.repository.MedicationRepository;
import com.ftn.dr_help.repository.PatientRepository;
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

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	
	public List<DoctorAppointmentDTO> findDoctorAppointments(Long doctor_id) {
		
		List<AppointmentPOJO> list = appointmentRepository.findDoctorAppointments(doctor_id);
		
		List<DoctorAppointmentDTO> appointments = new ArrayList<DoctorAppointmentDTO>();
		
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
				System.out.println("-------------------" + i);
				DoctorAppointmentDTO dto = convertAppointmentToDoctorDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
		}
		return appointments;
	}
	
	public List<DoctorAppointmentDTO> findApprovedDoctorAppointmentsWithPatientId(Long patient_id, Long doctor_id) {
		
		List<AppointmentPOJO> list = appointmentRepository.findApprovedDoctorAppointmentsForPatientWithId(doctor_id, patient_id);
		
		List<DoctorAppointmentDTO> appointments = new ArrayList<DoctorAppointmentDTO>();
		
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
				System.out.println("-------------------" + i);
				DoctorAppointmentDTO dto = convertAppointmentToDoctorDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
		}
		
		return appointments;
	}
	
public List<DoctorAppointmentDTO> findDoctorDoneAppointmentsForPatientWithId(Long patient_id) { //forDoctor je za doktora, if false, za medicinsku sestru
		
		List<AppointmentPOJO> list = appointmentRepository.findDoneAppointmentsForPatientWithId(patient_id);
		
		System.out.println("Done appointments za doktora");
		List<DoctorAppointmentDTO> appointments = new ArrayList<DoctorAppointmentDTO>();
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
				System.out.println("-------------------" + i);
				DoctorAppointmentDTO dto = convertAppointmentToDoctorDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
		}
		
		return appointments;
}
//			System.out.println("Done appointments za nurse");
//			
//			List<NurseAppointmentDTO> appointments = new ArrayList<NurseAppointmentDTO>();
//			int i = 0;
//			for (AppointmentPOJO appointmentPOJO : list) {
//					System.out.println("-------------------" + i);
//					NurseAppointmentDTO dto = convertAppointmentToNurseDTO(appointmentPOJO);
//					appointments.add(dto);
//					i++;
//
//			}
//			
//			return appointments;
//		}
		
		
	public List<NurseAppointmentDTO> findNurseAppointments(Long nurse_id) {
		
		List<AppointmentPOJO> list = appointmentRepository.findNurseAppointments(nurse_id);
		List<NurseAppointmentDTO> appointments = new ArrayList<NurseAppointmentDTO>();
		
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
				System.out.println("-------------------" + i);
				NurseAppointmentDTO dto = convertAppointmentToNurseDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
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
	
	private NurseAppointmentDTO convertAppointmentToNurseDTO(AppointmentPOJO appointment) {
		NurseAppointmentDTO dto = new NurseAppointmentDTO();
		
		DoctorPOJO doctor = appointment.getDoctor();
		
		if(doctor == null) {
			System.out.println("Nedje je greska, doktor ne sme biti null");
			return null;
		} 
		
		System.out.println("TKO JE DOCA" + doctor.getFirstName());
		dto.setDoctor_id(doctor.getId());
		dto.setDoctorFirstName(doctor.getFirstName());
		dto.setDoctorLastName(doctor.getLastName());
		
		PatientPOJO patient = appointment.getPatient();
		if(patient == null) {
			dto.setPatientFirstName("-");
			dto.setPatientLastName("-");
			
		}
		else {
			System.out.println("PACIJENT JE:" + patient.getFirstName());
			dto.setPatientFirstName(patient.getFirstName());
			dto.setPatientLastName(patient.getLastName());
			dto.setInsuranceNumber(String.valueOf(patient.getInsuranceNumber()));
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
		
		dto.setRoomName(appointment.getRoom().getName());
		dto.setRoomNumber(String.valueOf(appointment.getRoom().getNumber()));
		
		dto.setAppointment_id(appointment.getId());
		
		
		return dto;
	}
	
	
	
	public boolean addAppointment (Long doctorId, String dateString, Long patientId) throws ParseException {
		AppointmentPOJO newAppointment = new AppointmentPOJO ();
		SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
		Date date = sdf.parse(dateString);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		newAppointment.setDate(calendar);
		newAppointment.setDeleted(false);
		DoctorPOJO doctor = doctorRepository.getOne(doctorId);
		newAppointment.setDoctor(doctor);
		newAppointment.setPatient(patientRepository.getOne(patientId));
		newAppointment.setStatus(AppointmentStateEnum.REQUESTED);
		newAppointment.setProcedureType(doctor.getProcedureType());
		newAppointment.setRoom(null);
		newAppointment.setNurse(null);
		newAppointment.setDiscount(1);
		newAppointment.setExaminationReport(null);
		appointmentRepository.save(newAppointment);
		
		return false;
	}
	
	
	private DoctorAppointmentDTO convertAppointmentToDoctorDTO(AppointmentPOJO appointment) {
		
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
			dto.setInsuranceNumber(String.valueOf(patient.getInsuranceNumber()));
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
		
		return dto;
		
	}
	

}
