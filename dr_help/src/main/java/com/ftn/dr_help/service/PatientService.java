package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.HealthRecordDTO;
import com.ftn.dr_help.dto.MedicationDisplayDTO;

import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientHistoryDTO;
import com.ftn.dr_help.dto.PatientNameDTO;
import com.ftn.dr_help.dto.PatientProfileDTO;

import com.ftn.dr_help.dto.PerscriptionDisplayDTO;
import com.ftn.dr_help.model.pojo.AllergyPOJO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DiagnosisPOJO;
import com.ftn.dr_help.model.pojo.ExaminationReportPOJO;
import com.ftn.dr_help.model.pojo.HealthRecordPOJO;
import com.ftn.dr_help.model.pojo.MedicationPOJO;

import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.PerscriptionPOJO;
import com.ftn.dr_help.model.pojo.TherapyPOJO;
import com.ftn.dr_help.model.pojo.UserRequestPOJO;
import com.ftn.dr_help.repository.AllergyRepository;
import com.ftn.dr_help.repository.ExaminationReportRepository;
import com.ftn.dr_help.repository.PatientRepository;
import com.ftn.dr_help.repository.UserRequestRepository;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private UserRequestRepository userRequestRepository;
	
	@Autowired
	private AllergyRepository allergyRepository;
	
	@Autowired
	private ExaminationReportRepository examinationReportRepository;
	
	public List<PatientNameDTO> findAllNames() {
		List<PatientPOJO> finded = patientRepository.findAll();
		
		if(finded == null) {
			return null;
		}
		
		List<PatientNameDTO> ret = new ArrayList<PatientNameDTO>();
		for(PatientPOJO patient : finded) {
			ret.add(new PatientNameDTO(patient.getId(), patient.getFirstName(), patient.getLastName(), patient.getInsuranceNumber()));
		}
		
		return ret;
	}
	
	public PatientDTO findById(Long id) {
		if(id == null) {
			return null;
		}
		
		PatientPOJO finded = patientRepository.findById(id).orElse(null);
		
		if(finded == null) {
			return null;
		}
		
		return new PatientDTO(finded);
	}
	
	public List<UserRequestPOJO> findAllRequests() {
		return userRequestRepository.findAll();
	}
	
	public UserRequestPOJO findByEmail(String email) {
		return userRequestRepository.findByEmail(email);
	}
	
	
	public PatientPOJO findPatientByEmail(String email) {
		PatientPOJO retVal = patientRepository.findOneByEmail(email);
		
		return retVal;
	}
	
	
	public PatientPOJO findByInsuranceNumber (Long insuranceNumber) {
		return patientRepository.findByInsuranceNumber(insuranceNumber);
	}
	
	
	public void remove(UserRequestPOJO user) {
		userRequestRepository.deleteById(user.getId());
	}
	
	public PatientPOJO save(PatientPOJO patient) {
		return patientRepository.save(patient);
	}
	
	
	public List<PatientPOJO> findAll() {
		return patientRepository.findAll();
	}
	

	
	public PatientProfileDTO getPatientProfile (Long id) {
		PatientProfileDTO retVal = new PatientProfileDTO ();
		PatientPOJO pojo = patientRepository.getOne(id);
		
		if (pojo == null) {
			return null;
		}
		
		retVal.setId(pojo.getId());
		retVal.setEmail(pojo.getEmail());
		retVal.setFirstName(pojo.getFirstName());
		retVal.setLastName(pojo.getLastName());
		retVal.setAddress(pojo.getAddress());
		retVal.setCity(pojo.getCity());
		retVal.setState(pojo.getState());
		retVal.setPhoneNumber(pojo.getPhoneNumber());
		retVal.setBirthday(pojo.getBirthday());
		retVal.setInsuranceNumber(pojo.getInsuranceNumber());
		
		return retVal;
	}

	public PatientProfileDTO save(PatientProfileDTO profileUpdate, String email) {
		if (profileUpdate == null) {
			System.out.println("PRVI NULL");
			return null;
		}
		
		PatientPOJO current = patientRepository.findOneByEmail (email);
		if (current == null) {
			System.out.println("DRUGI NULL");
			return null;
		}
		
		current.setFirstName(profileUpdate.getFirstName ());
		current.setLastName(profileUpdate.getLastName ());
		current.setAddress (profileUpdate.getAddress());
		current.setCity(profileUpdate.getCity());
		current.setState(profileUpdate.getState());
		current.setPhoneNumber(profileUpdate.getPhoneNumber());
		
		patientRepository.save(current);
		return profileUpdate;
	}
	

	public List<PatientPOJO> singleFilterPatients(String filter) {
		List<PatientPOJO> patientList = patientRepository.findAll();
		
		//masan filter algorithm incoming
		ArrayList<PatientPOJO> filteredPatients = new ArrayList<PatientPOJO>();
		if (filter.matches("[0-9]+")) { //IS THE FILTER A NUMBER ONLY STRING ----> insurance search
			for (PatientPOJO patientPOJO : patientList) {
				if(patientPOJO.getInsuranceNumber().toString().contains(filter)) {
					filteredPatients.add(patientPOJO);				
				}
			}
			
			return filteredPatients;
			
		} else {
			String search = "";
			for (PatientPOJO patientPOJO : patientList) {
				search = patientPOJO.getFirstName().toLowerCase() + patientPOJO.getLastName().toLowerCase() + patientPOJO.getEmail().toLowerCase();
				if(search.contains(filter.toLowerCase())) {
					System.out.println("SEARCH IS: " + search);
					filteredPatients.add(patientPOJO);				
				}
			}
			
			return filteredPatients;
		}
	}
	

	public HealthRecordDTO getHealthRecord (String email) {
		PatientPOJO patient = patientRepository.findOneByEmail (email);
		if (patient == null) {
			System.out.println("Nisam pronasao pleba");
			return null;
		}
		
		HealthRecordPOJO healthRecord = patient.getHealthRecord();
		if (healthRecord == null) {
			System.out.println("Pleb nema karton");
			return null;
		}
		
		String allergyList = "";
		List<AllergyPOJO> allergies= allergyRepository.findAllByHealthRecordId(healthRecord.getId());
		int i = 0;
		for (; i < allergies.size() - 1; ++i) {
			allergyList += allergies.get(i).getAllergy() + ", ";
		}
		if (i > 0) {
			allergyList += allergies.get(i).getAllergy();
		} else if ((i == 0) && (allergies.size() == 1)) {
			allergyList = allergies.get(i).getAllergy();
		}
		if (allergyList.equals ("")) {
			allergyList = "/";
		}
		
		
		HealthRecordDTO retVal = new HealthRecordDTO ();
		
		retVal.setBirthday(patient.getBirthday());
		retVal.setBloodType(healthRecord.getBloodType());
		retVal.setDiopter(healthRecord.getDiopter());
		retVal.setFirstName(patient.getFirstName());
		retVal.setHeight(healthRecord.getHeight());
		retVal.setLastName(patient.getLastName());
		retVal.setWeight(healthRecord.getWeight());
		retVal.setAllergyList(allergyList);
		
		return retVal;
	}
	
	public List<PatientHistoryDTO> getHistory (String email) {
		PatientPOJO patient = patientRepository.findOneByEmail(email);
		HealthRecordPOJO healthRecord = patient.getHealthRecord();
		if (healthRecord == null) {
			return null;
		}
		List<ExaminationReportPOJO> examinationReports = examinationReportRepository.findAllByHealthRecordId(patient.getHealthRecord().getId());
		
		DateConverter dateConverter = new DateConverter ();
		
		List<PatientHistoryDTO> retVal = new ArrayList<PatientHistoryDTO>();
		for (ExaminationReportPOJO report : examinationReports) {
			PatientHistoryDTO retValItem = new PatientHistoryDTO ();
			AppointmentPOJO appointment = report.getAppointment();
			retValItem.setExaminationReportId(report.getId());
			
			retValItem.setDate(dateConverter.toString(appointment.getDate()));
			retValItem.setProcedureType(appointment.getProcedureType().getName());
			retValItem.setDoctor(appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName());
			retValItem.setNurse(appointment.getNurse().getFirstName() + " " + appointment.getNurse().getLastName());
			retValItem.setClinicName(report.getClinic().getName());
			retVal.add(retValItem);
		}
		if (retVal.size() > 0) {
			return retVal;
		}
		return null;
	}
	
	public PerscriptionDisplayDTO getPerscription (Long examinationReportId) {
		PerscriptionDisplayDTO retVal = new PerscriptionDisplayDTO ();
		ExaminationReportPOJO examinationReport = examinationReportRepository.getOne(examinationReportId);
		if (examinationReport == null) {
			return null;
		}
		
		PerscriptionPOJO perscription = examinationReport.getPerscription();
		if (perscription == null) {
			return null;
		}
		
		DiagnosisPOJO diagnosis = perscription.getDiagnosis();
		if (diagnosis != null) {
			retVal.setDiagnosis(diagnosis.getDiagnosis());
			retVal.setDescription(diagnosis.getDescription());
		} else {
			retVal.setDiagnosis("");
			retVal.setDescription("");
		}
		
		TherapyPOJO therapy = perscription.getTherapy();
		if (therapy != null) {
			retVal.setAdvice(therapy.getAdvice());
		} else {
			retVal.setAdvice("");
		}
		
		List<MedicationPOJO> medicationList = perscription.getMedicationList();
		List<MedicationDisplayDTO> medicationDto = new ArrayList<MedicationDisplayDTO> ();
		for (MedicationPOJO temp : medicationList) {
			MedicationDisplayDTO currentMedication = new MedicationDisplayDTO ();
			currentMedication.setMedicationName(temp.getMedicationName());
			currentMedication.setMedicationDescription(temp.getMedDescription());
			medicationDto.add(currentMedication);
		}
		if (medicationDto.size() == 0) {
			medicationDto.add(new MedicationDisplayDTO ("-", "-"));
		}
		retVal.setMedicationList(medicationDto);
		
		return retVal;
	}

	
	
	
	
	
}
