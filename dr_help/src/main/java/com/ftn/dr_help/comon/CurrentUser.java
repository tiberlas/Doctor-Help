package com.ftn.dr_help.comon;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class CurrentUser {
	
	/*
	 * returns e-mail of currently logged in user
	 * it reads the user from JWT
	 * */
	
	public static String getEmail() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if( principal instanceof UserDetails) {
			return ((UserDetails)principal).getUsername();
		} else {
			return principal.toString();
		}
	}

}
