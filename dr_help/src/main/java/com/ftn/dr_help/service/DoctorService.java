package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorListingDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.DoctorProfilePreviewDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.PatientHealthRecordDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.AllergyPOJO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.HealthRecordPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.validation.PasswordValidate;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository repository;
	
	@Autowired
	private AppPasswordEncoder encoder;
	
	@Autowired
	private PasswordValidate passwordValidate;
	
	@Autowired
	private ConcreteUserDetailInterface convertor;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	
	public List<DoctorProfileDTO> findAll(Long clinicID) {
		if(clinicID == null) {
			return null;
		}
		
		List<DoctorPOJO> finded = repository.findAllByClinic_id(clinicID);
		if(finded == null)
			return null;
		
		List<DoctorProfileDTO> ret = new ArrayList<DoctorProfileDTO>();
		for(DoctorPOJO doctor : finded) {
			if(!doctor.isDeleted()) {
				ret.add(new DoctorProfileDTO(doctor));				
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public DoctorProfileDTO findOne(Long clinicID, Long doctorID) {
		if(clinicID == null || doctorID == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findById(doctorID).orElse(null);
		if(finded == null || finded.isDeleted() || !finded.getClinic().getId().equals(clinicID)) {
			return null;
		}
		
		return new DoctorProfileDTO(finded);
	}
	
	public MedicalStaffProfileDTO findByEmail(String email) {
		if(email == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		
		if(finded == null) {
			return null;
		}
		
		return new MedicalStaffProfileDTO(finded);		
	}
	
	public DoctorPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO ret = repository.findById(id).orElse(null);
		
		return ret;
	}
	
	public MedicalStaffProfileDTO save(UserDetailDTO doctor, String email) {
		if(doctor == null) {
			return null;
		}
		
		DoctorPOJO current = repository.findOneByEmail(email);
		if(current == null)
			return null;
		
		//ProfileValidationInterface validate = new ProfileValidation();
		//ConcreteUserDetailInterface convertsToDoctor = new ConcreteUserDetail();
		
		convertor.changeTo(current, doctor);
		repository.save(current);
				
		return new MedicalStaffProfileDTO(current);
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		if(finded == null)
			return false;
		
		if(passwordValidate.isValid(password, finded.getPassword())) {
			String encoded = encoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			repository.save(finded);
			return true;
		}
		
		return false;
	}
	
	public List<DoctorListingDTO> filterByClinicAndProcedureType (Long clinicId, String procedureType) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.filterByClinicAndProcedureType(clinicId, procedureType);
		for (DoctorPOJO d : doctors) {
			System.out.println("For petlja u filteru po oba");
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> getAllUnfiltered () {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors = repository.findAll();
		for (DoctorPOJO d : doctors) {
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> filterByClinic (Long clinicId) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.findAllByClinic_id(clinicId);
		for (DoctorPOJO d : doctors) {
			retVal.add(new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public DoctorProfilePreviewDTO getProfilePreview (Long id) {
		DoctorPOJO doctor = repository.getOne(id);
		if (doctor == null) {
			return null;
		}
		DoctorProfilePreviewDTO retVal = new DoctorProfilePreviewDTO (doctor);
		return retVal;
	}
	
	public PatientHealthRecordDTO findPatientHealthRecord(Long appointmentId) {
		
		AppointmentPOJO app = appointmentRepository.findOneById(appointmentId);
		
		if(app == null) {
			System.out.println("Appointment with id: " + appointmentId+ " not found.");
			return null;
		}
		
		PatientPOJO patient = app.getPatient();
		
		if(patient == null) {
			System.out.println("Patient from appointment with id: " + appointmentId + " not found");
			return null;
		}
		
		HealthRecordPOJO healthRecord = patient.getHealthRecord();
		
//		String allergyList = "";
		List<AllergyPOJO> allergies= healthRecord.getAllergyList();
		
		ArrayList<String> list = new ArrayList<String>();
		
		for (AllergyPOJO allergy : allergies) {
			list.add(allergy.getAllergy());
		}
//		int i = 0;
//		for (; i < allergies.size() - 1; ++i) {
//			allergyList += allergies.get(i).getAllergy() + ", ";
//		}
//		if (i > 0) {
//			allergyList += allergies.get(i).getAllergy();
//		} else if ((i == 0) && (allergies.size() == 1)) {
//			allergyList = allergies.get(i).getAllergy();
//		}
//		if (allergyList.equals ("")) {
//			allergyList = "/";
//		}
//		
		
		PatientHealthRecordDTO retVal = new PatientHealthRecordDTO();
		
		retVal.setBirthday(patient.getBirthday().getTime());
		retVal.setBloodType(healthRecord.getBloodType());
		retVal.setDiopter(healthRecord.getDiopter());
		retVal.setFirstName(patient.getFirstName());
		retVal.setHeight(healthRecord.getHeight());
		retVal.setLastName(patient.getLastName());
		retVal.setWeight(healthRecord.getWeight());
		retVal.setAllergyList(list);
		
		System.out.println("FIRSTNAME: " + retVal.getFirstName() + "BIRTHDAY: " + retVal.getBirthday() + " BLOODTYPE: " + retVal.getBloodType() + "ALLERGYLIST: " + retVal.getAllergyList());
		
		return retVal;
		
	}
	
}
