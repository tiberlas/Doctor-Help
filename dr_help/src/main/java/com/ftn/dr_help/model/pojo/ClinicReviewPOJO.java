package com.ftn.dr_help.model.pojo;

import java.io.Serializable;


public class ClinicReviewPOJO implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private PatientPOJO patient;
	private Integer rating;
	
	public ClinicReviewPOJO() {
		
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PatientPOJO getPatient() {
		return patient;
	}
	public void setPatient(PatientPOJO patient) {
		this.patient = patient;
	}
	public Integer getRating() {
		return rating;
	}
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	
	
}
