package com.ftn.dr_help.model;

import java.util.Calendar;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.interfaces.UserInterface;
import com.ftn.dr_help.model.pojo.NursePOJO;

public class Nurse implements UserInterface {

	private NursePOJO nurse;
	private WorkSchedule workSchedule;
	
	public Nurse() {
		super();
		this.nurse = new NursePOJO();
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
		return this.nurse.getRole();
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return this.nurse.getId();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.nurse.getPassword();
	}

	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return this.nurse.getFirstName();
	}

	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return this.nurse.getLastName();
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return this.nurse.getEmail();
	}

	@Override
	public String getCity() {
		// TODO Auto-generated method stub
		return this.nurse.getCity();
	}

	@Override
	public String getState() {
		// TODO Auto-generated method stub
		return this.nurse.getState();
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return this.nurse.getAddress();
	}

	@Override
	public String getPhoneNumber() {
		// TODO Auto-generated method stub
		return this.nurse.getPhoneNumber();
	}

	@Override
	public Calendar getBirthday() {
		// TODO Auto-generated method stub
		return this.nurse.getBirthday();
	}

}
