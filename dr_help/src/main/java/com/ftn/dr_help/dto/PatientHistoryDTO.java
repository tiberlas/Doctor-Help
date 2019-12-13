package com.ftn.dr_help.dto;

import java.util.Calendar;

public class PatientHistoryDTO {

	public PatientHistoryDTO() {
		super();
	}
	public PatientHistoryDTO(Long examinationReportId, String date, String procedureType, String doctor, String nurse,
			String clinicName) {
		super();
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		Nurse = nurse;
		ClinicName = clinicName;
	}
	Long examinationReportId;
	String date;
	String procedureType;
	String doctor;
	String Nurse;
	String ClinicName;
	public Long getExaminationReportId() {
		return examinationReportId;
	}
	public void setExaminationReportId(Long examinationReportId) {
		this.examinationReportId = examinationReportId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getProcedureType() {
		return procedureType;
	}
	public void setProcedureType(String procedureType) {
		this.procedureType = procedureType;
	}
	public String getDoctor() {
		return doctor;
	}
	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}
	public String getNurse() {
		return Nurse;
	}
	public void setNurse(String nurse) {
		Nurse = nurse;
	}
	public String getClinicName() {
		return ClinicName;
	}
	public void setClinicName(String clinicName) {
		ClinicName = clinicName;
	}
	
}
