package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.PatientDTO;
import com.ftn.dr_help.dto.PatientNameDTO;
import com.ftn.dr_help.dto.PatientProfileDTO;
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
		PatientPOJO retVal = patientRepository.findOneByEmail(email);
		
		return retVal;
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
		
		//return patientList;
	}
	
	
	
}
