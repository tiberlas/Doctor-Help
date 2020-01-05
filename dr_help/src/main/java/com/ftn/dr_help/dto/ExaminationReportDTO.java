package com.ftn.dr_help.dto;

import java.util.ArrayList;
import java.util.Date;

public class ExaminationReportDTO {

	private String diagnosis;
	private ArrayList<String> medicationList;
	private String note;
	
	private Date dateStart;
	
	public ExaminationReportDTO() {
		
	}
	
	public ExaminationReportDTO(String diagnosis,
			ArrayList<String> medicationList, String note) {
		super();
		this.diagnosis = diagnosis;
		this.medicationList = medicationList;
		this.note = note;
	}

	public String getDiagnosis() {
		return diagnosis;
	}
	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}
	public ArrayList<String> getMedicationList() {
		return medicationList;
	}
	public void setMedicationList(ArrayList<String> medicationList) {
		this.medicationList = medicationList;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

	public Date getDateStart() {
		return dateStart;
	}

	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}
	
}
