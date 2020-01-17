package com.ftn.dr_help.dto;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;

public class PatientHistoryDTO {

	DateConverter dateConverter = new DateConverter ();
	
	public PatientHistoryDTO() {
		super();
	}
	public PatientHistoryDTO(Long examinationReportId, String date, String procedureType, String doctor, String nurse,
			String clinicName, Long clinicId) {
		super();
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		this.nurse = nurse;
		this.clinicName = clinicName;
		this.clinicId = clinicId;
	}
	
	public PatientHistoryDTO (AppointmentPOJO appointment) {
		switch (appointment.getStatus()) {
			case DONE: 
				this.status = "Done";
				break;
			case AVAILABLE:
				this.status = "Available";
				break;
			case APPROVED: 
				this.status = "Approved";
				break;
			case REQUESTED: 
				this.status = "Requested";
				break;
			default:
				this.status = "Unknown";
				break;
		}
		if (appointment.getExaminationReport() != null) {
			this.examinationReportId = appointment.getExaminationReport().getId();
		}
		this.date = dateConverter.americanDateToString(appointment.getDate());
		this.procedureType = appointment.getProcedureType().getName();
		this.doctor = appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName();
		this.nurse = appointment.getNurse().getFirstName() + " " + appointment.getNurse().getLastName();
		this.clinicName = appointment.getDoctor().getClinic().getName();
		this.clinicId = appointment.getDoctor().getClinic().getId();
		this.doctorId = appointment.getDoctor().getId();
		this.nurseId = appointment.getNurse().getId();
		// TODO: Dovrsi ovo formatiranje
	}
	
	String status;
	Long examinationReportId;
	String date;
	String procedureType;
	String doctor;
	String nurse;
	String clinicName;
	Long clinicId;
	Long doctorId;
	Long nurseId;
	
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
		return this.nurse;
	}
	public void setNurse(String nurse) {
		this.nurse = nurse;
	}
	public String getClinicName() {
		return clinicName;
	}
	public void setClinicName(String clinicName) {
		this.clinicName = clinicName;
	}
	public Long getClinicId() {
		return clinicId;
	}
	public void setClinicId(Long clinicId) {
		this.clinicId = clinicId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}
	public Long getNurseId() {
		return this.nurseId;
	}
	public void setNurseId(Long nurseId) {
		this.nurseId = nurseId;
	}
	
}
