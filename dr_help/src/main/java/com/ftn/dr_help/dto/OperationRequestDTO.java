package com.ftn.dr_help.dto;

public class OperationRequestDTO {

	private Long doctor0;
	private Long doctor1;
	private Long doctor2;
	private String dateAndTimeString;
	private Long patientId;
	private Long operationType;
	
	public OperationRequestDTO() {
		super();
	}
	
	public OperationRequestDTO(Long doctor0, Long doctor1, Long doctor2, String dateAndTimeString, Long patientId, Long operationType) {
		super();
		this.doctor0 = doctor0;
		this.doctor1 = doctor1;
		this.doctor2 = doctor2;
		this.dateAndTimeString = dateAndTimeString;
		this.patientId = patientId;
		this.operationType = operationType;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Long getOperationType() {
		return operationType;
	}

	public void setOperationType(Long operationType) {
		this.operationType = operationType;
	}

	public Long getDoctor0() {
		return doctor0;
	}

	public void setDoctor0(Long doctor0) {
		this.doctor0 = doctor0;
	}

	public Long getDoctor1() {
		return doctor1;
	}

	public void setDoctor1(Long doctor1) {
		this.doctor1 = doctor1;
	}

	public Long getDoctor2() {
		return doctor2;
	}

	public void setDoctor2(Long doctor2) {
		this.doctor2 = doctor2;
	}

	public String getDateAndTimeString() {
		return dateAndTimeString;
	}

	public void setDateAndTimeString(String dateAndTimeString) {
		this.dateAndTimeString = dateAndTimeString;
	}
	
	
}
