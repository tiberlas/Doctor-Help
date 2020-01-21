package com.ftn.dr_help.dto;

public class AppointmentDeleteDTO {

	public AppointmentDeleteDTO(Long appointmentId) {
		super();
		this.appointmentId = appointmentId;
	}

	public AppointmentDeleteDTO() {
		super();
	}

	private Long appointmentId;

	public Long getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	
}
