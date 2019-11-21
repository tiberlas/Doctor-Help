package com.ftn.dr_help.validation;

import java.util.Calendar;

public class ProfileValidation implements ProfileValidationInterface{

	@Override
	public boolean isValidName(String name) {
		if(name != null) {
			String trimName = name.trim();
			if(trimName.length() > 0 && trimName.length() < 31) {
				return true;
			}
		}
		
		return false;
	}

	@Override
	public boolean isValidEmail(String email) {
		if(email != null) {
			String trimEmail = email.trim();
			if(trimEmail.length() > 0 && trimEmail.contains("@")) {
				return true;
			}
		}
				 
		return false;
	}

	@Override
	public boolean isValidPlace(String place) {
		if(place != null) {
			String trimPlace = place.trim();
			if(trimPlace.length() > 0 && trimPlace.length() < 102) {
				return true;
			}
		}
		
		return false;
	}

	@Override
	public boolean isValidDate(Calendar date) {
		if(date != null && date.before(Calendar.getInstance())) {
			return true;
		}
		
		return false;
	}

	@Override
	public boolean isValidPhoneNumber(String phonenumber) {
		if(phonenumber != null) {
			String trimPhone = phonenumber.trim();
			if(trimPhone.length() > 0 ) {
				return true;
			}
		}
		
		return false;
	}

}
