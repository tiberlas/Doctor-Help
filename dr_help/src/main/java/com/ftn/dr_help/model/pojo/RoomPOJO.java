package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;

public class RoomPOJO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private int number;
	private ArrayList<ProceduresTypePOJO> procedurasTypes = null;
	
	
	public RoomPOJO() {
		super();
		// TODO Auto-generated constructor stub
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
	public ArrayList<ProceduresTypePOJO> getProcedurasTypes() {
		return procedurasTypes;
	}
	public void setProcedurasTypes(ArrayList<ProceduresTypePOJO> procedurasTypes) {
		this.procedurasTypes = procedurasTypes;
	}
	
	
	
	

}
