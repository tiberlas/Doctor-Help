package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PerscriptionPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column (name = "diagnosis", nullable = false)
	private DiagnosisPOJO diagnosis;
	
	@Column (name = "medicationList", nullable = true)
	private List<MedicationPOJO> medicationList;
	
	@Column (name = "signingNurse", nullable = false)
	private NursePOJO signingNurse;
	
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	private Long id;
	
	public DiagnosisPOJO getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(DiagnosisPOJO diagnosis) {
		this.diagnosis = diagnosis;
	}
	public List<MedicationPOJO> getMedicationList() {
		return medicationList;
	}
	public void setMedicationList(ArrayList<MedicationPOJO> medicationList) {
		this.medicationList = medicationList;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public NursePOJO getSigningNurse () {
		return this.signingNurse;
	}
	public void setigningNurse (NursePOJO signingNurse) {
		this.signingNurse = signingNurse;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setSigningNurse(NursePOJO signingNurse) {
		this.signingNurse = signingNurse;
	}
	

}
