package com.ftn.dr_help.validation;

import java.util.Calendar;

public interface ProfileValidationInterface {
	
	public boolean isValidName(String name);
	public boolean isValidEmail(String email);
	public boolean isValidPlace(String place);
	public boolean isValidDate(Calendar date);
	public boolean isValidPhoneNumber(String phonenumber);

}
