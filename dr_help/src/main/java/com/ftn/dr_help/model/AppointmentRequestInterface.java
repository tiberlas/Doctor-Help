package com.ftn.dr_help.model;

import java.util.Calendar;

import com.ftn.dr_help.model.pojo.PatientPOJO;

public interface AppointmentRequestInterface {

	public Calendar getDate();
	public PatientPOJO getPatient();
	//public ProcedureType getAppointmentType();
	
}
