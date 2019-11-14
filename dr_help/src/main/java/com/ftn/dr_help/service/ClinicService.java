package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.repository.ClinicRepositorium;

@Service
public class ClinicService {

		@Autowired
		@Qualifier("InMemoryClinicRepository")
		private ClinicRepositorium repository;
		
		public ClinicRoomListDTO getAllRooms(Long clinicId) {
			ClinicPOJO ret = repository.getOne(clinicId);
			
			if(ret == null)
				return null;
			
			return new ClinicRoomListDTO(ret);
		} 
		
}
