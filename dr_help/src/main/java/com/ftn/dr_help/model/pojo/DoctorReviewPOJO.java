package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

public class DoctorReviewPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	private DoctorPOJO doctor;
	private PatientPOJO patient;
	private Integer rating;
	
	public DoctorReviewPOJO() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DoctorPOJO getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorPOJO doctor) {
		this.doctor = doctor;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
