package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class MedicationPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column (name = "medicationName", nullable = false)
	private String medicationName;
	
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "medDescription", nullable = true)
	private String medDescription;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private PerscriptionPOJO perscription;
	
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

	public PerscriptionPOJO getPerscription() {
		return perscription;
	}

	public void setPerscription(PerscriptionPOJO perscription) {
		this.perscription = perscription;
	}
	
}
