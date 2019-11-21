package com.ftn.dr_help.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.repository.ClinicRepositorium;


@Service()
public class ClinicService {

	@Autowired
	@Qualifier("postgre")
	private ClinicRepositorium repository;
	
	public ClinicPOJO findOne(Long id) {
		return repository.findById(id).orElseGet(null); 	
	}
	
	public ClinicDTO findOneDTO(Long id) {
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
		return repository.save(clinic);
	}
	
		
	public ClinicRoomListDTO getAllRooms(Long clinicId) {
		ClinicPOJO ret = repository.getOne(clinicId);
			
		if(ret == null)
			return null;
			
		return new ClinicRoomListDTO(ret);
		} 
		
}
