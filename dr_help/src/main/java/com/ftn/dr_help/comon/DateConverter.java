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
		String retVal = "";
		
		if(time.get(Calendar.HOUR) < 10) {
			retVal += "0"+String.valueOf(time.get(Calendar.HOUR)) + ":";
		} else {
			retVal += String.valueOf(time.get(Calendar.HOUR)) + ":";
		}
		
		if(time.get(Calendar.MINUTE) < 10) {
			retVal += "0" + String.valueOf(time.get(Calendar.MINUTE));
		} else {
			retVal += String.valueOf(time.get(Calendar.MINUTE));
		}
		
		return retVal;
	}
	
	public String americanDateToString(Calendar date) {
		String retVal = String.valueOf(date.get(Calendar.YEAR)) + "-";
		
		if((date.get(Calendar.MONTH) + 1) < 10) {
			retVal += "0"+String.valueOf(date.get(Calendar.MONTH) + 1) + "-";
		} else {
			retVal += String.valueOf(date.get(Calendar.MONTH) + 1) + "-";
		}
		
		if(date.get(Calendar.DAY_OF_MONTH) < 10) {
			retVal += "0"+String.valueOf(date.get(Calendar.DAY_OF_MONTH)) + "-";
		} else {
			retVal += String.valueOf(date.get(Calendar.DAY_OF_MONTH));
		}
		
		return retVal;
	}
}
