package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.RoomCalendarDTO;
import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
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
	
	@Autowired
	private DateConverter dateConvertor;
	
	public List<RoomDTO> findAll(String email) {
		
		try {
			List<RoomPOJO> finded = adminRepository.findOneByEmail(email).getClinic().getRoomList();
			
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
		} catch(Exception e) {
			return null;
		}
	}
	
	public RoomDTO findOne(Long roomID, String email) {
		
		Long clinicID = adminRepository.findOneByEmail(email).getClinic().getId();
		
		if(roomID == null) {
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
		
		try {
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			
			ClinicPOJO clinic = admin.getClinic();
			RoomPOJO finded = repository.findByIdAndClinic_id(room.getId(), clinic.getId()).orElse(null);
			if(finded == null) {
				return null;			
			}
			
			RoomPOJO exist = repository.findOneByNumber(room.getNumber()).orElse(null);
			if(exist!= null && exist.getNumber() != finded.getNumber()) {
				return null;
			}
			
			ProceduresTypePOJO procedurasTypes = procedureTypeRepository.findById(room.getProcedureTypeId()).orElse(null);
			if(procedurasTypes == null) {
				return null;
			}
			
			finded.setName(room.getName());
			finded.setNumber(room.getNumber());
			finded.setProcedurasTypes(procedurasTypes);
			repository.save(finded);
			
			return new RoomDTO(finded);
		} catch(Exception e) {
			return null;
		}
	}
	
	public List<RoomCalendarDTO> getSchedule(Long roomId) throws NullPointerException{
		
			RoomPOJO room = repository.findById(roomId).orElse(null);
			
			String begining;
			if(room.getProcedurasTypes().isOperation()) {
				begining = "Operation with dr ";
			} else {
				begining = "Appointment with dr ";
			}
			
			Calendar durationDate = Calendar.getInstance(); 
			durationDate.setTime(room.getProcedurasTypes().getDuration());
			
			List<RoomCalendarDTO> ret = new ArrayList<>();
			for(AppointmentPOJO appointment : room.getAppointments()) {
				if(!appointment.isDeleted()) {
					RoomCalendarDTO scheduledAppointment = new RoomCalendarDTO();
					scheduledAppointment.setAppointmentId(appointment.getId());
					scheduledAppointment.setTitle(begining+appointment.getDoctor().getFirstName()+" "+appointment.getDoctor().getLastName());
					scheduledAppointment.setDate(dateConvertor.americanDateToString(appointment.getDate()));
					scheduledAppointment.setStartTime(dateConvertor.timeToString(appointment.getDate()));
					
					Calendar endTimeDate = appointment.getDate();
					endTimeDate.add(Calendar.HOUR, durationDate.get(Calendar.HOUR));
					endTimeDate.add(Calendar.MINUTE, durationDate.get(Calendar.MINUTE));
					String endTime = dateConvertor.timeToString(endTimeDate);
					scheduledAppointment.setEndTime(endTime);
					
					ret.add(scheduledAppointment);
				}
			}
			
			return ret;
	}
	
}
