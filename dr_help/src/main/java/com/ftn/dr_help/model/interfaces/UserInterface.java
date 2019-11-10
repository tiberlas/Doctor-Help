package com.ftn.dr_help.model.interfaces;

import java.util.Calendar;

import com.ftn.dr_help.model.enums.RoleEnum;

public interface UserInterface {

	public RoleEnum getRole();
	public Long getId();
	public String getPassword();
	public String getFirstName();
	public String getLastName();
	public String getEmail();
	public String getCity();
	public String getState();
	public String getAddress();
	public String getPhoneNumber();
	public Calendar getBirthday();
}
