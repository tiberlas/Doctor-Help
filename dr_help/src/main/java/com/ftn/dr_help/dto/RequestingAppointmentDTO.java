package com.ftn.dr_help.dto;

public class RequestingAppointmentDTO {

	private Long id;
	private String date;
	private String type;
	private String doctor;
	private String nurse;
	private String patient;
	
	public RequestingAppointmentDTO() {
		super();
	}
	
	public RequestingAppointmentDTO(Long id, String date, String type, String doctor, String nurse, String patient) {
		super();
		this.id = id;
		this.date = date;
		this.type = type;
		this.doctor = doctor;
		this.nurse = nurse;
		this.patient = patient;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDoctor() {
		return doctor;
	}

	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}

	public String getNurse() {
		return nurse;
	}

	public void setNurse(String nurse) {
		this.nurse = nurse;
	}

	public String getPatient() {
		return patient;
	}

	public void setPatient(String patient) {
		this.patient = patient;
	}
	
}
