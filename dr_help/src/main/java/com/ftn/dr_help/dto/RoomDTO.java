package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.RoomPOJO;

public class RoomDTO {

	private Long id;
	private String name;
	private int number;
	
	public RoomDTO(RoomPOJO room) {
		super();
		this.id = room.getId();
		this.name = room.getName();
		this.number = room.getNumber();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	
	
	
}
