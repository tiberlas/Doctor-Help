package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

public class ExaminationReportPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private TherapyPOJO therapy;
	private PerscriptionPOJO perscription;
	private AppointmentPOJO appointment;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public TherapyPOJO getTherapy() {
		return therapy;
	}
	public void setTherapy(TherapyPOJO therapy) {
		this.therapy = therapy;
	}
	public PerscriptionPOJO getPerscription() {
		return perscription;
	}
	public void setPerscription(PerscriptionPOJO perscription) {
		this.perscription = perscription;
	}
	public AppointmentPOJO getAppointment() {
		return appointment;
	}
	public void setAppointment(AppointmentPOJO appointment) {
		this.appointment = appointment;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
