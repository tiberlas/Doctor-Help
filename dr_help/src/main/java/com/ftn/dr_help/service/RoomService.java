package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.model.convertor.ClinicUpdate;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ClinicRepository;
import com.ftn.dr_help.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository repository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private ClinicRepository clinicRepository;
	
	public List<RoomDTO> findAll(Long clinicID) {
		if(clinicID == null) {
			return null;
		}
		
		List<RoomPOJO> finded = repository.findAllByClinic_id(clinicID);
		
		if(finded == null)
			return null;
		
		List<RoomDTO> ret = new ArrayList<RoomDTO>();
		for(RoomPOJO room : finded) {
			if(!room.isDeleted()) {
				ret.add(new RoomDTO(room));				
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public RoomDTO findOne(Long clinicID, Long roomID) {
		if(clinicID == null || roomID == null) {
			return null;
		}
		
		RoomPOJO finded = repository.findByIdAndClinic_id(roomID, clinicID).orElse(null);
		
		if(finded == null || finded.isDeleted())
			return null;
		
		return new RoomDTO(finded);
	}
	
	public RoomDTO save(RoomDTO newRoom, String email) {
		if(email == null) {
			return null;
		}
		
		if(newRoom == null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO clinic = admin.getClinic();
		RoomPOJO room = new RoomPOJO();
		room.setName(newRoom.getName());
		room.setNumber(newRoom.getNumber());
		room.setClinic(clinic);
		//fali za procedure type
		repository.save(room);
		
		clinic.addRoom(room);
		clinicRepository.save(clinic);
		
		return new RoomDTO(room);
	}
	
	public void delete(Long id, String email) {
		if(email == null) {
			return;
		}
		
		if(id == null) {
			return;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return;
		}
		
		ClinicPOJO clinic = admin.getClinic();
		RoomPOJO finded = repository.findByIdAndClinic_id(id, clinic.getId()).orElse(null);
		if(finded == null)
			return;
		
		clinic.deleteRoom(finded);
		clinicRepository.save(clinic);
		finded.setDeleted(true);
		repository.save(finded);
	}
	
	public RoomDTO change(RoomDTO room, String email) {
		if(email == null) {
			return null;
		}
		
		if(room == null || room.getId() == null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO clinic = admin.getClinic();
		RoomPOJO finded = repository.findByIdAndClinic_id(room.getId(), clinic.getId()).orElse(null);
		if(finded == null) {
			return null;			
		}
		
		finded.setName(room.getName());
		finded.setNumber(room.getNumber());
		repository.save(finded);
		
		return new RoomDTO(finded);
	}
	
}
