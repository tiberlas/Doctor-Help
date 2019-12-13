package com.ftn.dr_help.comon;

import java.util.Calendar;

import org.springframework.stereotype.Component;

@Component
public class DateConverter {

	public DateConverter () {}
	
	public String toString (Calendar date) {
		String retVal =  String.valueOf(date.get(Calendar.DAY_OF_MONTH)) + "." 
				+ String.valueOf(date.get(Calendar.MONTH) + 1) + "." 
				+ String.valueOf(date.get(Calendar.YEAR)) + ".";
		return retVal;
	}
}
