package com.ftn.dr_help.dto;

import java.util.ArrayList;

import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;

public class ClinicRoomListDTO {
	
	private ArrayList<RoomDTO> rooms;

	public ClinicRoomListDTO() {
		rooms = new ArrayList<RoomDTO>();
	}
	
	public ClinicRoomListDTO(ClinicPOJO clinic) {
		super();
		ArrayList<RoomPOJO> rom = (ArrayList<RoomPOJO>) clinic.getRoomList();
		rooms = new ArrayList<RoomDTO>();
		
		for (RoomPOJO roomPOJO : rom) {
			rooms.add(new RoomDTO(roomPOJO));
		}
	}
	
	public ClinicRoomListDTO(ArrayList<RoomDTO> rooms) {
		super();
		this.rooms = rooms;
	}

	public ArrayList<RoomDTO> getRooms() {
		return rooms;
	}

	public void setRooms(ArrayList<RoomDTO> rooms) {
		this.rooms = rooms;
	}
	
	

}
