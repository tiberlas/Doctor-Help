package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ClinicRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;
import com.ftn.dr_help.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	private RoomRepository repository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private ClinicRepository clinicRepository;
	
	@Autowired
	private ProcedureTypeRepository procedureTypeRepository;
	
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

		try {
			
			RoomPOJO exist = repository.findOneByNumber(newRoom.getNumber()).orElse(null);
			if(exist != null) {
				return null;
			}
			
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			
			ClinicPOJO clinic = admin.getClinic();
			RoomPOJO room = new RoomPOJO();
			room.setName(newRoom.getName());
			room.setNumber(newRoom.getNumber());
			room.setClinic(clinic);
			
			ProceduresTypePOJO procedure = procedureTypeRepository.findById(newRoom.getProcedureTypeId()).orElse(null);
			if(procedure == null) {
				return null;
			}
			room.setProcedurasTypes(procedure);
			
			repository.save(room);
			
			clinic.addRoom(room);
			clinicRepository.save(clinic);
			
			return new RoomDTO(room);
			
		} catch(Exception e) {
			return null;
		}
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
		
		if(room == null || room.getId() == null || room.getNumber() == 0 || room.getName() == null) {
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
		
		RoomPOJO exist = repository.findOneByNumber(room.getNumber()).orElse(null);
		if(exist!= null && exist.getNumber() != finded.getNumber()) {
			return null;
		}
		
		
		finded.setName(room.getName());
		finded.setNumber(room.getNumber());
		repository.save(finded);
		
		return new RoomDTO(finded);
	}
	
}
