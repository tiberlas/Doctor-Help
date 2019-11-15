package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.repository.ClinicRepository;

@Service
public class ClinicService {

	@Autowired
	private ClinicRepository clinicRepository;
	
	
	public ClinicPOJO findOne(Long id) {
		return clinicRepository.findById(id).orElseGet(null);
	}
	
	public List<ClinicPOJO> findAll() {
		return clinicRepository.findAll();
	}


	public ClinicPOJO save(ClinicPOJO clinic) {
		return clinicRepository.save(clinic);
	}

}
