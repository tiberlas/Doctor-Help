package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicRoomListDTO;
import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.repository.ClinicRepositorium;

@Service
public class ClinicService {

		@Autowired
		@Qualifier("InMemoryClinicRepository")
		private ClinicRepositorium repository;
		
		public ClinicRoomListDTO getAllRooms(Long clinicId) {
			return new ClinicRoomListDTO(repository.getOne(clinicId));
		} 
		
}
