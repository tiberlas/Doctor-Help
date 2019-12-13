package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.RoomPOJO;

public class RoomDTO {

	private Long id;
	private String name;
	private int number;
	private String procedureTypeName;
	
	public RoomDTO(RoomPOJO room) {
		super();
		this.id = room.getId();
		this.name = room.getName();
		this.number = room.getNumber();
		if(room.getProcedurasTypes() != null) {
			this.procedureTypeName = room.getProcedurasTypes().getName();		
		}
	}	
	
	public RoomDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RoomDTO(Long id, String name, int number, String procedureTypeName) {
		super();
		this.id = id;
		this.name = name;
		this.number = number;
		this.procedureTypeName = procedureTypeName;
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
	public String getProcedureTypeName() {
		return procedureTypeName;
	}
	public void setProcedureTypeName(String procedureTypeName) {
		this.procedureTypeName = procedureTypeName;
	}
	
	
	
}
