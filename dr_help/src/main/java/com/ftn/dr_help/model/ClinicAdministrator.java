package com.ftn.dr_help.model;

import java.util.Calendar;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.interfaces.UserInterface;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;

public class ClinicAdministrator implements UserInterface{

	private ClinicAdministratorPOJO clinicAdministrator;

	public ClinicAdministrator() {
		super();
		this.clinicAdministrator = new ClinicAdministratorPOJO();
	}

	@Override
	public RoleEnum getRole() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getRole();
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getId();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getPassword();
	}

	@Override
	public String getFirstName() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getFirstName();
	}

	@Override
	public String getLastName() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getLastName();
	}

	@Override
	public String getEmail() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getEmail();
	}

	@Override
	public String getCity() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getCity();
	}

	@Override
	public String getState() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getState();
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getAddress();
	}

	@Override
	public String getPhoneNumber() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getPhoneNumber();
	}

	@Override
	public Calendar getBirthday() {
		// TODO Auto-generated method stub
		return this.clinicAdministrator.getBirthday();
	}
}
