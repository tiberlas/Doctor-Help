package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.ClinicPOJO;

public class ClinicDTO {
	
	private Long id;
	private String name;
	private String address;
	private String city;
	private String state;
	private String description;
	
	public ClinicDTO() {
		
	}
	
	public ClinicDTO(Long id, String name, String address, String city, String state, String description) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.city = city;
		this.state = state;
		this.description = description;
	}
	
	public ClinicDTO(ClinicPOJO clinic) {
		this(clinic.getId(), clinic.getName(), clinic.getAddress(), clinic.getCity(), clinic.getState(), clinic.getDescription());
	}

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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
