package com.ftn.dr_help.dto;

import java.util.List;

public class PerscriptionDisplayDTO {

	private String Diagnosis;
	private String Description;
	private String Advice;
	private List<MedicationDisplayDTO> medicationList;
	private Long clinicId;
	
	public PerscriptionDisplayDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PerscriptionDisplayDTO(String diagnosis, String description, String advice,
			List<MedicationDisplayDTO> medicationList, Long clinicId) {
		super();
		Diagnosis = diagnosis;
		Description = description;
		Advice = advice;
		this.medicationList = medicationList;
		this.clinicId = clinicId;
	}
	
	public String getDiagnosis() {
		return Diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		Diagnosis = diagnosis;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getAdvice() {
		return Advice;
	}
	public void setAdvice(String advice) {
		Advice = advice;
	}
	public List<MedicationDisplayDTO> getMedicationList() {
		return medicationList;
	}
	public void setMedicationList(List<MedicationDisplayDTO> medicationList) {
		this.medicationList = medicationList;
	}
	public Long getClinicId() {
		return clinicId;
	}
	public void setClinicId(Long clinicId) {
		this.clinicId = clinicId;
	}
	
}
