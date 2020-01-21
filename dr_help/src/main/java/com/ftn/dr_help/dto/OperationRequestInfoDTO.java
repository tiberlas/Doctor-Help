package com.ftn.dr_help.dto;

public class OperationRequestInfoDTO {

	private Long operationId;
	private String date;
	private String procedureName;
	private Long procedureId;
	private String dr0;
	private String dr1;
	private String dr2;
	private String patient;
	private String procedureDuration;
	
	public OperationRequestInfoDTO() {
		super();
	}
	
	public OperationRequestInfoDTO(Long operationId, String date, String procedureName, Long procedureId, String dr0,
			String dr1, String dr2, String patient, String procedureDuration) {
		super();
		this.operationId = operationId;
		this.date = date;
		this.procedureName = procedureName;
		this.procedureId = procedureId;
		this.dr0 = dr0;
		this.dr1 = dr1;
		this.dr2 = dr2;
		this.patient = patient;
		this.procedureDuration = procedureDuration;
	}

	public String getProcedureDuration() {
		return procedureDuration;
	}

	public void setProcedureDuration(String procedureDuration) {
		this.procedureDuration = procedureDuration;
	}

	public Long getOperationId() {
		return operationId;
	}

	public void setOperationId(Long operationId) {
		this.operationId = operationId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}

	public Long getProcedureId() {
		return procedureId;
	}

	public void setProcedureId(Long procedureId) {
		this.procedureId = procedureId;
	}

	public String getDr0() {
		return dr0;
	}

	public void setDr0(String dr0) {
		this.dr0 = dr0;
	}

	public String getDr1() {
		return dr1;
	}

	public void setDr1(String dr1) {
		this.dr1 = dr1;
	}

	public String getDr2() {
		return dr2;
	}

	public void setDr2(String dr2) {
		this.dr2 = dr2;
	}

	public String getPatient() {
		return patient;
	}

	public void setPatient(String patient) {
		this.patient = patient;
	}
}
