package com.ftn.dr_help.comon.schedule;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.DayEnum;
import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

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

	public List<EqualDoctorShifts> FindEqualDoctorShifts(DoctorPOJO dr0, DoctorPOJO dr1, DoctorPOJO dr2) {
		/*
		 * Vraca listu radnih dana kaje su zajednicke za sve doctore
		 * u suprotnom vratu null, pa ti doctori ne mogu da rade na toj operaciji
		 * */
		List<EqualDoctorShifts> finded = new ArrayList<>();
		Shift[] shift = new Shift[7];
		DayEnum[] days = new DayEnum[] {
				DayEnum.SUNDAY, DayEnum.MONDAY, DayEnum.TUESDAY, DayEnum.WEDNESDAY, DayEnum.THURSDAY, DayEnum.FRIDAY, DayEnum.SATURDAY
		};
		
		shift[0] = intercetShift(dr0.getSunday(), dr1.getSunday(), dr2.getSunday());
		shift[1] = intercetShift(dr0.getMonday(), dr1.getMonday(), dr2.getMonday());
		shift[2] = intercetShift(dr0.getTuesday(), dr1.getTuesday(), dr2.getTuesday());
		shift[3] = intercetShift(dr0.getWednesday(), dr1.getWednesday(), dr2.getWednesday());
		shift[4] = intercetShift(dr0.getThursday(), dr1.getThursday(), dr2.getThursday());
		shift[5] = intercetShift(dr0.getFriday(), dr1.getFriday(), dr2.getFriday());
		shift[6] = intercetShift(dr0.getSaturday(), dr1.getSaturday(), dr2.getSaturday());
		
		for(int i = 0; i<7; ++i) {
			if(shift[i] != Shift.NONE) {
				finded.add(new EqualDoctorShifts(days[i] , shift[i]));
			}
		}
		
		if(finded.isEmpty()) {
			return null; //doctori nemaju zajednicke radne dane
		} else {
			return finded;
		}
	}
	
	private Shift intercetShift(Shift sh0, Shift sh1, Shift sh2) {
		
		if(sh0 == Shift.FIRST && sh1 == Shift.FIRST && sh2 == Shift.FIRST) {
			return Shift.FIRST;
		} else if(sh0 == Shift.SECOND && sh1 == Shift.SECOND && sh2 == Shift.SECOND) {
			return Shift.SECOND;
		} else if(sh0 == Shift.THIRD && sh1 == Shift.THIRD && sh2 == Shift.THIRD) {
			return Shift.THIRD;
		} else {
			return Shift.NONE;
		}
	}
	
}
