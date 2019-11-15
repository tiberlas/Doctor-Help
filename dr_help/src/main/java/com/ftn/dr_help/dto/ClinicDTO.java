package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.ClinicPOJO;

public class ClinicDTO {
	
	private Long id;
	private String name;
	private String address;
	private String description;
	
	public ClinicDTO() {
		
	}
	
	public ClinicDTO( String name, String address, String description) {
		super();
		//this.id = id;
		this.name = name;
		this.address = address;
		this.description = description;
	}
	
	public ClinicDTO(ClinicPOJO clinic) {
		this(clinic.getName(), clinic.getAddress(), clinic.getDescription());
	}
	

//	public ClinicDTO(ClinicPOJO clinic) {
//		this(clinic.getId(), clinic.getName(), clinic.getAddress(), clinic.getDescription()); //clinic.getId(),
//	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
