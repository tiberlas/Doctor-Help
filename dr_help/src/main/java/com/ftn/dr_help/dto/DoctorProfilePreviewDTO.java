package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

public class DoctorProfilePreviewDTO {


	private String firstName;
	private String lastName;
	private String clinic;
	private String specialization;
	private String rating = "/";
	
	public DoctorProfilePreviewDTO() {
		super();
	}
	
	public DoctorProfilePreviewDTO(String firstName, String lastName, String clinic, String specialization,
			String rating) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.clinic = clinic;
		this.specialization = specialization;
		this.rating = rating;
	}
	
	public DoctorProfilePreviewDTO (DoctorPOJO d) {
		this.firstName = d.getFirstName ();
		this.lastName = d.getLastName();
		this.clinic = d.getClinic().getName();
		this.specialization = d.getProcedureType().getName();
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
	public String getClinic() {
		return clinic;
	}
	public void setClinic(String clinic) {
		this.clinic = clinic;
	}
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	
}
