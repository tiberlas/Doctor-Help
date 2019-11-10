package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

public class MedicationPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String medicationName;
	private Long id;
	private String medDescription;
	
	public MedicationPOJO () {
		
	}
	
	public String getMedicationName() {
		return medicationName;
	}
	public void setMedicationName(String medicationName) {
		this.medicationName = medicationName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMedDescription() {
		return medDescription;
	}
	public void setMedDescription(String medDescription) {
		this.medDescription = medDescription;
	}
	
}
