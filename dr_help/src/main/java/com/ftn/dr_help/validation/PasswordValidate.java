package com.ftn.dr_help.validation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;

@Service
public class PasswordValidate implements PasswordValidateInterface{
	
	
	
	@Override
	public boolean isValid(ChangePasswordDTO newPassword, String encodedPaString) {
		if(newPassword == null || newPassword.getNewPassword() == null || newPassword.getOldPassword() == null) {
			return false;
		}
		
		if(newPassword.getOldPassword().trim() == "" || newPassword.getNewPassword().trim() == "") {
			return false;
		}
		
		if(encodedPaString == null)
			return false;
		
		PasswordEncoder passwordEncoder = AppPasswordEncoder.getEncoder();
		
		if(passwordEncoder.matches(newPassword.getOldPassword(), encodedPaString)) {
			return true;
		}
		
		return false;
	}

}
