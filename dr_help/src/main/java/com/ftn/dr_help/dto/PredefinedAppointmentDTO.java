package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;

public class PredefinedAppointmentDTO {

	private Long id;
	private String dateAndTime;
	private Long proceduretypeId;
	private Long roomId;
	private Long doctorId;
	private double price;
	private double disscount;
	
	
	public PredefinedAppointmentDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PredefinedAppointmentDTO(Long id, String dateAndTime, Long proceduretypeId, Long roomId, Long doctorId, double price,
			double disscount) {
		super();
		this.id = id;
		this.dateAndTime = dateAndTime;
		this.proceduretypeId = proceduretypeId;
		this.roomId = roomId;
		this.doctorId = doctorId;
		this.price = price;
		this.disscount = disscount;
	}
	
	public PredefinedAppointmentDTO(AppointmentPOJO pojo) {
		super();
		this.id = pojo.getId();
		this.dateAndTime = pojo.getDate().toString();
		this.proceduretypeId = pojo.getProcedureType().getId();
		this.roomId = pojo.getRoom().getId();
		this.doctorId = pojo.getDoctor().getId();
		this.price = pojo.getProcedureType().getPrice();
		this.disscount = pojo.getDiscount();
	}

	public String getDateAndTime() {
		return dateAndTime;
	}

	public void setDateAndTime(String dateAndTime) {
		this.dateAndTime = dateAndTime;
	}

	public Long getProceduretypeId() {
		return proceduretypeId;
	}

	public void setProceduretypeId(Long proceduretypeId) {
		this.proceduretypeId = proceduretypeId;
	}

	public Long getRoomId() {
		return roomId;
	}

	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getDisscount() {
		return disscount;
	}

	public void setDisscount(double disscount) {
		this.disscount = disscount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
