package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository repository;
	
	public List<RoomDTO> findAll(Long clinicID) {
		List<RoomPOJO> finded = repository.findAllByClinic_id(clinicID);
		
		if(finded == null)
			return null;
		
		List<RoomDTO> ret = new ArrayList<RoomDTO>();
		for(RoomPOJO room : finded) {
			ret.add(new RoomDTO(room));
		}
		
		return ret;
	}
	
	public RoomDTO findOne(Long clinicID, Long roomID) {
		RoomPOJO finded = repository.findByIdAndClinic_id(roomID, clinicID).orElse(null);
		
		if(finded == null)
			return null;
		
		return new RoomDTO(finded);
	}
	
}
