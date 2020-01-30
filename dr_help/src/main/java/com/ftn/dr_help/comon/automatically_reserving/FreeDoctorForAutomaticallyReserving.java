package com.ftn.dr_help.comon.automatically_reserving;

import java.util.Calendar;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

public class FreeDoctorForAutomaticallyReserving {

	private Calendar recomendedDate;
	private DoctorPOJO doctor;
	
	public FreeDoctorForAutomaticallyReserving() {
		super();
	}
	
	public FreeDoctorForAutomaticallyReserving(Calendar recomendedDate, DoctorPOJO doctor) {
		super();
		this.recomendedDate = recomendedDate;
		this.doctor = doctor;
	}

	public Calendar getRecomendedDate() {
		return recomendedDate;
	}

	public void setRecomendedDate(Calendar recomendedDate) {
		this.recomendedDate = recomendedDate;
	}

	public DoctorPOJO getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorPOJO doctor) {
		this.doctor = doctor;
	}
	
	
}
