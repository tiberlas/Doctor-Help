package com.ftn.dr_help.model;

import java.util.Calendar;

import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;

public class CenterAdmin implements UserInterface{

	private CentreAdministratorPOJO centerAdministrator;
	
	public CenterAdmin() {
		super();
		this.centerAdministrator = new CentreAdministratorPOJO();
	}

	@Override
	public RoleEnum getRole() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getRole();
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getId();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getPassword();
	}

	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getFirstName();
	}

	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getLastName();
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getEmail();
	}

	@Override
	public String getCity() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getCity();
	}

	@Override
	public String getState() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getState();
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getAddress();
	}

	@Override
	public String getPhoneNumber() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getPhoneNumber();
	}

	@Override
	public Calendar getBirthday() {
		// TODO Auto-generated method stub
		return this.centerAdministrator.getBirthday();
	}

}
