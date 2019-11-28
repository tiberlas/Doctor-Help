package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.DoctorRepository;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository repository;
	
	public DoctorProfileDTO findById(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findById(id).orElse(null);
		
		if(finded == null) {
			return null;
		}
		
		return new DoctorProfileDTO(finded);		
	}
	
	public DoctorProfileDTO save(DoctorProfileDTO newProfile) {
		if(newProfile == null) {
			return null;
		}
		
		
		
		return null;
	}
	
}
