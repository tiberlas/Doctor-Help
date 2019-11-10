package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;

public class PerscriptionPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private DiagnosisPOJO diagnosis;
	private ArrayList<MedicationPOJO> medicationList;
	//private NursePOJO nurse;
	
	public DiagnosisPOJO getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(DiagnosisPOJO diagnosis) {
		this.diagnosis = diagnosis;
	}
	public ArrayList<MedicationPOJO> getMedicationList() {
		return medicationList;
	}
	public void setMedicationList(ArrayList<MedicationPOJO> medicationList) {
		this.medicationList = medicationList;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	/*
	public Nurse getNurse () {
		return this.nurse;
	}
	public void setNurse (Nurse nurse) {
		this.nurse = nurse;
	}
	*/

}
