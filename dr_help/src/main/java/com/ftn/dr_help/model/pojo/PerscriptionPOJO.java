package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class PerscriptionPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	private DiagnosisPOJO diagnosis;
	
	@OneToMany(mappedBy = "perscription", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<MedicationPOJO> medicationList;
	
	@OneToOne(fetch = FetchType.LAZY)
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
	public TherapyPOJO getTherapy() {
		return therapy;
	}
	public void setTherapy(TherapyPOJO therapy) {
		this.therapy = therapy;
	}
	public ExaminationReportPOJO getExaminationReport() {
		return examinationReport;
	}
	public void setExaminationReport(ExaminationReportPOJO examinationReport) {
		this.examinationReport = examinationReport;
	}
	public void setMedicationList(List<MedicationPOJO> medicationList) {
		this.medicationList = medicationList;
	}
	

}
