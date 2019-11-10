package com.ftn.dr_help.model;

import java.util.Calendar;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.interfaces.UserInterface;
import com.ftn.dr_help.model.pojo.PatientPOJO;

public class Patient implements UserInterface {

	private PatientPOJO patient;

	public Patient() {
		super();
		this.patient = new PatientPOJO();
	}

	@Override
	public RoleEnum getRole() {
		// TODO Auto-generated method stub
		return this.patient.getRole();
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return this.patient.getId();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.patient.getPassword();
	}

	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return this.patient.getFirstName();
	}

	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return this.patient.getLastName();
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return this.patient.getEmail();
	}

	@Override
	public String getCity() {
		// TODO Auto-generated method stub
		return this.patient.getCity();
	}

	@Override
	public String getState() {
		// TODO Auto-generated method stub
		return this.patient.getState();
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return this.patient.getAddress();
	}

	@Override
	public String getPhoneNumber() {
		// TODO Auto-generated method stub
		return this.patient.getPhoneNumber();
	}

	@Override
	public Calendar getBirthday() {
		// TODO Auto-generated method stub
		return this.patient.getBirthday();
	}
	
	
}
