package com.ftn.dr_help.comon;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AppPasswordEncoder {
	
	/*
	 * defines encoder witch to use
	 * */
	
	public static PasswordEncoder getEncoder() {
		return new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2Y, 10);
		
	}

}
