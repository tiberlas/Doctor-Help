package com.ftn.dr_help.dto;

public class RoomCalendarDTO {
	
	private Long appointmentId;
	private String title;
	private String date;
	private String StartTime;
	private String duration;
	
	public RoomCalendarDTO() {
		super();
	}
	
	public RoomCalendarDTO(Long appointmentId, String title, String date, String time, String duration) {
		super();
		this.appointmentId = appointmentId;
		this.title = title;
		this.date = date;
		this.StartTime = time;
		this.duration = duration;
	}
	
	public Long getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStartTime() {
		return StartTime;
	}
	public void setStartTime(String time) {
		this.StartTime = time;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}

}
