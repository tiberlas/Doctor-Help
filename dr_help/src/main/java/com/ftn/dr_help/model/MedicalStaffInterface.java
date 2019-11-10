package com.ftn.dr_help.model;

import java.util.ArrayList;
import java.util.Calendar;

import com.ftn.dr_help.model.enums.DayEnum;

public interface MedicalStaffInterface {

	public void requestLeave();
	public WorkSchedule getWorkSchedule();
	public Calendar getShiftStart();
	public Calendar getShiftEnd();
	public ArrayList<DayEnum> getDaysOff();
	public ArrayList<Calendar> getLeaveDays();
}
