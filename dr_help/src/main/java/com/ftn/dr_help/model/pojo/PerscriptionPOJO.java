package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.FetchType;
import javax.persistence.OneToOne;

public class PerscriptionPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@OneToOne(fetch = FetchType.LAZY)
	private DiagnosisPOJO diagnosis;
	
	
	private ArrayList<MedicationPOJO> medicationList;
	private NursePOJO signingNurse;
	
	@OneToOne(fetch = FetchType.LAZY)
	private TherapyPOJO therapy;
	
	@OneToOne(fetch = FetchType.LAZY)
	private ExaminationReportPOJO examinationReport;
	
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
	public NursePOJO getSigningNurse () {
		return this.signingNurse;
	}
	public void setigningNurse (NursePOJO signingNurse) {
		this.signingNurse = signingNurse;
	}
	

}
