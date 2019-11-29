package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.MedicationPOJO;
import com.ftn.dr_help.repository.MedicationRepository;

@Service
public class MedicationService {

	@Autowired 
	private MedicationRepository medicationRepository;
	
	
	
	public List<MedicationPOJO> findAll() {
		return medicationRepository.findAll();
	}
	
	
	public MedicationPOJO save(MedicationPOJO med) {
		return medicationRepository.save(med); 
	}

	
}
