package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.PatientProfileDTO;
import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientNameDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.UserRequestPOJO;
import com.ftn.dr_help.repository.PatientRepository;
import com.ftn.dr_help.repository.UserRequestRepository;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private UserRequestRepository userRequestRepository;
	
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
		return patientRepository.findByEmail(email);
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
	
	public void createAllRequests() {
		UserRequestPOJO u1 = new UserRequestPOJO();

		u1.setEmail("nikolic.dusan.dey@gmail.com");
		u1.setFirstName("Duki");
		u1.setLastName("Kuki");
		u1.setAddress("C dom");
		u1.setCity("Djurvidek");
		u1.setState("Djurbija");
		u1.setPhoneNumber("BoyOhBOYOHBOOOY");
		u1.setBirthday(Calendar.getInstance());
		u1.setInsuranceNumber(123456789L);
		u1.setPassword("ohb0y");
		userRequestRepository.save(u1);
		
		UserRequestPOJO u2 = new UserRequestPOJO();
		u2.setEmail("TestB0i@yahoo.com");
		u2.setFirstName("Miroslav");
		u2.setLastName("Krleža");
		u2.setAddress("F dom");
		u2.setCity("Zapadni istočnjak");
		u2.setState("Arabija");
		u2.setPhoneNumber("123312");
		u2.setBirthday(Calendar.getInstance());
		u2.setInsuranceNumber(987654312L);
		u2.setPassword("ohb0y");
		
		userRequestRepository.save(u2);
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
	
}
