package com.ftn.dr_help.model;

import java.util.ArrayList;
import java.util.Calendar;

import com.ftn.dr_help.model.enums.DayEnum;
import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.interfaces.MedicalStaffInterface;
import com.ftn.dr_help.model.interfaces.UserInterface;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

public class Doctor implements UserInterface, MedicalStaffInterface{

	private DoctorPOJO doctor;
	private WorkSchedule workSchedule;
	
	public Doctor() {
		super();
		this.doctor = new DoctorPOJO();
	}
	
	public WorkSchedule getWorkSchedule() {
		return workSchedule;
	}

	public void setWorkSchedule(WorkSchedule workSchedule) {
		this.workSchedule = workSchedule;
	}

	@Override
	public RoleEnum getRole() {
		// TODO Auto-generated method stub
		return this.doctor.getRole();
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return this.doctor.getId();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.doctor.getPassword();
	}

	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return this.doctor.getFirstName();
	}

	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return this.doctor.getLastName();
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return this.doctor.getEmail();
	}

	@Override
	public String getCity() {
		// TODO Auto-generated method stub
		return this.doctor.getCity();
	}

	@Override
	public String getState() {
		// TODO Auto-generated method stub
		return this.doctor.getState();
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return this.doctor.getAddress();
	}

	@Override
	public String getPhoneNumber() {
		// TODO Auto-generated method stub
		return this.doctor.getPhoneNumber();
	}

	@Override
	public Calendar getBirthday() {
		// TODO Auto-generated method stub
		return this.doctor.getBirthday();
	}

	@Override
	public void requestLeave() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Calendar getShiftStart() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Calendar getShiftEnd() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<DayEnum> getDaysOff() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<Calendar> getLeaveDays() {
		// TODO Auto-generated method stub
		return null;
	}

}
