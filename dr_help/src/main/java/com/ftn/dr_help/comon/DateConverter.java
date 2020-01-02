package com.ftn.dr_help.comon;

import java.util.Calendar;

import org.springframework.stereotype.Service;

@Service
public class DateConverter {
	
	public String toString (Calendar date) {
		String retVal =  String.valueOf(date.get(Calendar.DAY_OF_MONTH)) + "." 
				+ String.valueOf(date.get(Calendar.MONTH) + 1) + "." 
				+ String.valueOf(date.get(Calendar.YEAR)) + ".";
		return retVal;
	}
	
	public String dateAndTimeToString (Calendar date) {
		String retVal =  String.valueOf(date.get(Calendar.DAY_OF_MONTH)) + "." 
				+ String.valueOf(date.get(Calendar.MONTH) + 1) + "." 
				+ String.valueOf(date.get(Calendar.YEAR)) + ". "
				+ String.valueOf(date.get(Calendar.HOUR)) + ":"
				+ String.valueOf(date.get(Calendar.MINUTE));
		return retVal;
	}
	
	public String timeToString(Calendar time) {
		String retVal = String.valueOf(time.get(Calendar.HOUR)) + ":"
				+ String.valueOf(time.get(Calendar.MINUTE));
		
		return retVal;
	}
}
