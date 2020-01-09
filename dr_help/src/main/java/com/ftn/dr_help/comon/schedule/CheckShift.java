package com.ftn.dr_help.comon.schedule;

import java.util.Calendar;

import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.Shift;

@Service
public class CheckShift {
	
	/*
	 * proverava da li je termin u dobroj smeni
	 * prva smena je od 8 do 16 sati
	 * druga smena od 16 do 24 sati
	 * treca od 00 do 8 sati
	 * */
	public boolean check(Calendar schedule, Shift shift) {
		Calendar upper = Calendar.getInstance();
		Calendar lower = Calendar.getInstance();
		
		upper.setTime(schedule.getTime());
		lower.setTime(schedule.getTime());
		
		upper.set(Calendar.MINUTE, 0);
		lower.set(Calendar.MINUTE, 0);
		
		switch(shift) {
		case FIRST:
			lower.set(Calendar.HOUR, 8);
			lower.set(Calendar.AM_PM, Calendar.AM);
			upper.set(Calendar.HOUR, 4);
			upper.set(Calendar.AM_PM, Calendar.PM);
			break;
		case SECOND:
			lower.set(Calendar.HOUR, 4);
			lower.set(Calendar.AM_PM, Calendar.PM);
			upper.set(Calendar.HOUR, 0);
			upper.set(Calendar.AM_PM, Calendar.AM);
			upper.add(Calendar.DAY_OF_MONTH, 1);//sledeci dan u 00:00
			break;
		case THIRD:
			lower.set(Calendar.HOUR, 0);
			lower.set(Calendar.AM_PM, Calendar.AM);
			upper.set(Calendar.HOUR, 8);
			upper.set(Calendar.AM_PM, Calendar.AM);
			//upper.add(Calendar.DAY_OF_MONTH, 1); //sledeci dan u 8 ujutru
			break;
		default:
			//slobodan dan je
			return false;
		}
		
		if(schedule.compareTo(lower) >= 0 && schedule.compareTo(upper) <= 0) {
			return true;
		} else {
			return false;
		}
	}

}
