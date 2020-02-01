package com.ftn.dr_help.comon.automatically_reserving;

import java.util.Calendar;

public interface CheckDoctorsInterface {

	/*
	 * returns a doctor that is free for the requesting time;
	 * or returns first free doctor of the requesting time with the new date
	 * */
	public FreeDoctorForAutomaticallyReserving findFreeDoctor(Calendar requestingDate, Long clinicId, Long procedureId);
}
