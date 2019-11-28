package com.ftn.dr_help.validation;

import com.ftn.dr_help.dto.ClinicDTO;

public class ClinicValidation {
	
	/*
	 * checks if clinic is valid
	 * a field must not be null or have only white spaces
	 * if a field is empty("") that means that the field is not updated
	 * */

	public static boolean isValid(ClinicDTO clinic) {
		
		if(!validField(clinic.getAddress()) && clinic.getAddress()!="") {
			return false;
		}
		
		if(!validField(clinic.getName()) && clinic.getName()!="") {
			return false;
		}
		
		if(!validField(clinic.getDescription()) && clinic.getDescription()!="") {
			return false;
		}
		
		if(clinic.getId() == null) {
			return false;
		}
		
		
		return true;
	}
	
	private static boolean validField(String address) {
		if(address != null) {
			String trimName = address.trim();
			if(trimName.length() > 0 && trimName.length() < 31) {
				return true;
			}
		}
		
		return false;
	}
}
