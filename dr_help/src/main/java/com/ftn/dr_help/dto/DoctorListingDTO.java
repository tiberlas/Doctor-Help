package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

public class DoctorListingDTO {

	private String firstName;
	private String lastName;
	private String rating = "Ma doktor, bre!";
	private Long id;
	public DoctorListingDTO() {
		super();
	}
	public DoctorListingDTO(String firstName, String lastName, String rating, Long id) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.rating = rating;
		this.id = id;
	}
	public DoctorListingDTO(DoctorPOJO d) {
		this.firstName = d.getFirstName();
		this.lastName = d.getLastName();
		this.id = d.getId();
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
}
