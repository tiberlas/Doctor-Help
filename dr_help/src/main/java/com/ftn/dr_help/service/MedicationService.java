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
		MedicationPOJO finded = medicationRepository.findOneByMedicationName(med.getMedicationName()).orElse(null);
		if(finded == null)
			return medicationRepository.save(med);
		return null;
	}
	
	public MedicationPOJO findByName(String name) {
		
		return medicationRepository.findOneByMedicationName(name).orElse(null);
	}

	
}
