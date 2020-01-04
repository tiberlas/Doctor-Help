package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.dto.RoomCalendarDTO;
import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.dto.RoomSearchDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
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
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DateConverter dateConvertor;
	
	public List<RoomDTO> findAll(String email) {
		
		try {
			List<RoomPOJO> finded = adminRepository.findOneByEmail(email).getClinic().getRoomList();
			
			if(finded == null)
				return null;

			List<RoomPOJO> reservedRooms = repository.getAllReservedRooms();
			
			List<RoomDTO> ret = new ArrayList<RoomDTO>();
			for(RoomPOJO room : finded) {
				if(!room.isDeleted()) {
					RoomDTO roomDTO;
					if(reservedRooms.contains(room)) {
						roomDTO = new RoomDTO(room);
						roomDTO.setReserved(true);
					} else {
						roomDTO = new RoomDTO(room);
					}
					roomDTO.setFirstFreeSchedule(findFirstFreeSchedule(room));
					
					ret.add(roomDTO);
				}
			}
		
			if(ret.isEmpty()) {
				return null;
			}
			
			return ret;
		} catch(Exception e) {
			System.out.println("EXCEPTION "+e.getMessage() +" CAUSE:" + e.getCause());
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
	
	public boolean delete(Long id, String email) {
		try {
			if(email == null) {
				return false;
			}
			
			if(id == null) {
				return false;
			}
			
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			if(admin == null) {
				return false;
			}
			
			ClinicPOJO clinic = admin.getClinic();
			RoomPOJO finded = repository.findByIdAndClinic_id(id, clinic.getId()).orElse(null);
			if(finded == null)
				return false;
			
			List<RoomPOJO> reservedRooms = repository.getAllReservedRooms();
			if(reservedRooms.contains(finded)) {
				System.out.println("reserved");
				return false;
			}
			
			clinic.deleteRoom(finded);
			clinicRepository.save(clinic);
			finded.setDeleted(true);
			repository.save(finded);
			return true;
		} catch(Exception e) {
			return false;
		}
	}
	
	public RoomDTO change(RoomDTO room, String email) {
		
		try {
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			
			ClinicPOJO clinic = admin.getClinic();
			RoomPOJO finded = repository.findByIdAndClinic_id(room.getId(), clinic.getId()).orElse(null);
			if(finded == null) {
				return null;			
			}
			
			List<RoomPOJO> reservedRooms = repository.getAllReservedRooms();
			if(reservedRooms.contains(finded)) {
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
	
	public List<RoomDTO> search(RoomSearchDTO searchParameters, String email) {
		/*
		 * searchParameter if a field is not in use for search the it must be null;
		 * searchParameter.getDate must be in format yyyy-MM-dd HH:mm; 
		 * Calendar is singleton!!! 
		 * */
		try {
			List<RoomPOJO> allRooms = adminRepository.findOneByEmail(email).getClinic().getRoomList();
			
			List<RoomDTO> retVal = new ArrayList<RoomDTO>();
			for(RoomPOJO room : allRooms) {
				RoomDTO newRoom = new RoomDTO(room);
				newRoom.setFirstFreeSchedule(findFirstFreeSchedule(room));
				retVal.add(newRoom);
			}
			
			if(searchParameters.getName() == null && 
					searchParameters.getNumber() == null &&
					searchParameters.getTypeId() == null &&
					searchParameters.getDate() == null) {
				
				return retVal;
			}
			
			List<RoomDTO> roomsFilteredDate = new ArrayList<>();
			if(searchParameters.getDate() == null) {
				roomsFilteredDate = retVal;
			} else {
				Calendar searchedDate = dateConvertor.stringToDate(searchParameters.getDate());
				
				for(RoomPOJO room : allRooms) {
					Date duration = room.getProcedurasTypes().getDuration();
					boolean flagReserved = false;
				
					List<AppointmentPOJO> appointments = room.getAppointments();
					for(AppointmentPOJO appointment : appointments) {
						if(appointment.isDeleted()) {
							continue;
						}
						
						Calendar endDate = Calendar.getInstance();
						endDate.setTime(appointment.getDate().getTime());
						@SuppressWarnings("deprecation")
						int hours = duration.getHours();
						@SuppressWarnings("deprecation")
						int minutes = duration.getMinutes();
						endDate.add(Calendar.HOUR, hours);
						endDate.add(Calendar.MINUTE, minutes);
						
						//System.out.println(appointment.getId());
						//System.out.println(dateConvertor.dateAndTimeToString(searchedDate));
						//System.out.println(dateConvertor.dateAndTimeToString(appointment.getDate()));
						//System.out.println(dateConvertor.dateAndTimeToString(endDate));
						
						//System.out.println(searchedDate.after(appointment.getDate()));
						//System.out.println(searchedDate.equals(appointment.getDate()));
						//System.out.println(searchedDate.before(endDate));
						//System.out.println(searchedDate.equals(endDate));
						
						if(searchedDate.compareTo(appointment.getDate()) >= 0 && searchedDate.compareTo(endDate) <= 0) {
							flagReserved = true;
							break;
						}
					}

					if(!flagReserved) {
						RoomDTO newRoom = new RoomDTO(room);
						newRoom.setFirstFreeSchedule(findFirstFreeSchedule(room));
						roomsFilteredDate.add(newRoom);						
					}
				}
			}
			
			if(roomsFilteredDate.isEmpty()) {
				return roomsFilteredDate;
			}
			
			List<RoomDTO> roomsFilteredName;
			if(searchParameters.getName() == null) {
				roomsFilteredName = roomsFilteredDate;
			} else {
				roomsFilteredName = new ArrayList<>();
				for(RoomDTO room : roomsFilteredDate) {
					if(room.getName().toLowerCase().contains(searchParameters.getName().toLowerCase())) {
						roomsFilteredName.add(room);
					}
				}
			}
			
			if(roomsFilteredName.isEmpty()) {
				return roomsFilteredName;
			}
			
			List<RoomDTO> roomsFilteredNumber;
			if(searchParameters.getNumber() == null) {
				roomsFilteredNumber = roomsFilteredName;
			} else {
				roomsFilteredNumber = new ArrayList<>();
				for(RoomDTO room : roomsFilteredName) {
					if(room.getNumber() == searchParameters.getNumber()) {
						roomsFilteredNumber.add(room);
					}
				}
			}
			
			if(roomsFilteredNumber.isEmpty()) {
				return roomsFilteredNumber;
			}
			
			List<RoomDTO> roomsFilteredType;
			if(searchParameters.getTypeId() == null) {
				roomsFilteredType = roomsFilteredNumber;
			} else {
				roomsFilteredType = new ArrayList<>();
				for(RoomDTO room : roomsFilteredNumber) {
					if(room.getProcedureTypeId() == searchParameters.getTypeId()) {
						roomsFilteredType.add(room);
					}
				}
			}
			
			return roomsFilteredType;
		} catch(Exception e) {
			return null;
		}
	}
	
	private String findFirstFreeSchedule(RoomPOJO room) {
		
		Date duration = room.getProcedurasTypes().getDuration();
		@SuppressWarnings("deprecation")
		int hours = duration.getHours();
		@SuppressWarnings("deprecation")
		int minutes = duration.getMinutes();
		
		Calendar begin = Calendar.getInstance(); //sadrzi pocetak prvog slobodnog termina; prvi je sutra u 8 
		begin.add(Calendar.DAY_OF_MONTH, 1);
		begin.set(Calendar.HOUR, 8);
		begin.set(Calendar.MINUTE, 0);
		
		Calendar end = Calendar.getInstance(); //sadrzi kraj termina u odnosu na begin
		end.add(Calendar.DAY_OF_MONTH, 1);
		end.set(Calendar.HOUR, 8);
		end.set(Calendar.MINUTE, 0);
		end.add(Calendar.HOUR, hours);
		end.add(Calendar.MINUTE, minutes);
		
		List<Date> dates = appointmentRepository.findScheduledDatesOfRoom(room.getId());
		for(Date date : dates) {
			if(date.after(begin.getTime())) {
				//prvi termin koji je posle trazenog pocetka
				if(date.after(end.getTime())) {
					//ovaj termin pocinje posle kraja trazenog termina; znaci trazeni termin je prvi slobodni
					return dateConvertor.dateAndTimeToString(begin);
				} else {
					//definise se novi trazeni termin koji pocinje posle zavrsetka tekuceg
					begin.setTime(date); //kraj tekuceg termina
					begin.add(Calendar.HOUR, hours);
					begin.add(Calendar.MINUTE, minutes);
					
					end.setTime(date);
					end.add(Calendar.HOUR, hours*2);
					end.add(Calendar.MINUTE, minutes*2);
				}
			}
		}
		
		return dateConvertor.dateAndTimeToString(begin);
	}
	
}
