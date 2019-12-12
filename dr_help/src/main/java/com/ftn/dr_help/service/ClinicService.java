package com.ftn.dr_help.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.model.convertor.ClinicUpdate;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ClinicRepository;
import com.ftn.dr_help.validation.ClinicValidation;


@Service()
public class ClinicService {

	@Autowired
	private ClinicRepository repository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	public ClinicPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		return repository.findById(id).orElseGet(null); 	
	}
	
	public ClinicDTO findOneDTO(Long id) {
		if(id == null) {
			return null;
		}
		
		ClinicPOJO ret = repository.findById(id).orElseGet(null);
		
		if(ret == null) {
			return null;
		}
		
		return new ClinicDTO(ret); 	
	}
	
	public List<ClinicPOJO> findAll() {
		return repository.findAll();
	}


	public ClinicPOJO save(ClinicPOJO clinic) {
		if(clinic == null) {
			return null;
		}
		
		return repository.save(clinic);
	}
	
	public ClinicDTO save(ClinicDTO clinic, String email) {
		if(email == null) {
			return null;
		}
		
		if(!ClinicValidation.isValid(clinic)) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO oldClinic = admin.getClinic();
		if(oldClinic == null || !(oldClinic.getId().equals(clinic.getId())) ) {
			return null;
		}
		
		ClinicUpdate.update(oldClinic, clinic);
		repository.save(oldClinic);
		
		return new ClinicDTO(oldClinic);
	}
		
	public ClinicRoomListDTO getAllRooms(Long clinicId) {
		if(clinicId == null) {
			return null;
		}
		
		ClinicPOJO ret = repository.findById(clinicId).orElse(null);
			
		if(ret == null)
			return null;
			
		return new ClinicRoomListDTO(ret);
	}
	
	public ClinicPOJO findByName(String name) {
		return repository.findByName(name);
	}
		
}
