package com.ftn.dr_help.dto;

import java.util.Date;

public class DoctorAppointmentDTO {

	private Long appointment_id;

	private String patientFirstName;
	private String patientLastName;
	
	private Date startDate;
	private Date endDate;
	
	private String roomName;
	private String roomNumber;
	
	private Boolean isOperation;
	
	private String procedureName;
	private String price;
	private String discount;
	
	private String status;
	
	private String insuranceNumber;
	
	public DoctorAppointmentDTO() {
		
	}
	
	public DoctorAppointmentDTO(
			String patientFirstName, String patientLastName, Date startDate,
			Date endDate, String roomName, String roomNumber, Boolean isOperation, String procedureName, String appointmentPrice, String status) {
		super();

		this.patientFirstName = patientFirstName;
		this.patientLastName = patientLastName;
		this.startDate = startDate;
		this.endDate = endDate;
		this.roomName = roomName;
		this.roomNumber = roomNumber;
		this.isOperation = isOperation;
		this.procedureName = procedureName;
		this.price = appointmentPrice;
		this.status = status;
	}
	
	public String getPatientFirstName() {
		return patientFirstName;
	}
	public void setPatientFirstName(String patientFirstName) {
		this.patientFirstName = patientFirstName;
	}
	public String getPatientLastName() {
		return patientLastName;
	}
	public void setPatientLastName(String patientLastName) {
		this.patientLastName = patientLastName;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getRoomNumber() {
		return roomNumber;
	}
	public void setRoomNumber(String roomNumber) {
		this.roomNumber = roomNumber;
	}

	public Boolean getIsOperation() {
		return isOperation;
	}

	public void setIsOperation(Boolean isOperation) {
		this.isOperation = isOperation;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String appointmentPrice) {
		this.price = appointmentPrice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getAppointment_id() {
		return appointment_id;
	}

	public void setAppointment_id(Long appointment_id) {
		this.appointment_id = appointment_id;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getInsuranceNumber() {
		return insuranceNumber;
	}

	public void setInsuranceNumber(String insuranceNumber) {
		this.insuranceNumber = insuranceNumber;
	}
	
	
	
	
}
