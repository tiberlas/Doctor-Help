package com.ftn.dr_help.comon.schedule;

import java.util.Calendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

@Service
public class NiceScheduleBeginning {

	/*
	 * stavi da pocetak bude shodno radnoj smeni
	 * npr ake je prva smena onda je pocetak u 8 ujutru;
	 * ako je druga onda je poccetak u 4 poslepodne;
	 * i treca je u ponoc
	 * */
	public void setNiceScheduleBeginning(DoctorPOJO doctor, Calendar begin) {
		
		Shift shift = Shift.NONE;
		
		int i = 0;
		while(i < 7) {
			int day = begin.get(Calendar.DAY_OF_WEEK);

			//nadje smenu
			switch(day) {
			case Calendar.MONDAY:
				shift = doctor.getMonday();
				break;
			case Calendar.TUESDAY:
				shift = doctor.getTuesday();
				break;
			case Calendar.WEDNESDAY:
				shift = doctor.getWednesday();
				break;
			case Calendar.THURSDAY:
				shift = doctor.getThursday();
				break;
			case Calendar.FRIDAY:
				shift = doctor.getFriday();
				break;
			case Calendar.SATURDAY:
				shift = doctor.getSaturday();
				break;
			case Calendar.SUNDAY:
				shift = doctor.getSunday();
				break;
			}
			
			switch(shift) {
			case FIRST:
				begin.set(Calendar.HOUR, 8);
				begin.set(Calendar.MINUTE, 0);
				begin.set(Calendar.AM_PM, Calendar.AM);
				return;
			case SECOND:
				begin.set(Calendar.HOUR, 4);
				begin.set(Calendar.MINUTE, 0);
				begin.set(Calendar.AM_PM, Calendar.PM);
				return;
			case THIRD:
				begin.set(Calendar.HOUR, 0);
				begin.set(Calendar.MINUTE, 0);
				begin.set(Calendar.AM_PM, Calendar.AM);
				return;
			case NONE:
				//ovaj dan nije radan
				begin.add(Calendar.DAY_OF_MONTH, 1);
			}
			
			++i;
		}
	}
	
	public Calendar setNiceOperationBegin(List<EqualDoctorShifts> equalShifts, Calendar begin) {
		/*
		 * vrati prida dan posle trazenog dana koji je u preseku radnih smena
		 * */
		Calendar niceBegin = Calendar.getInstance();
		niceBegin.setTime(begin.getTime());
	
		for(int i=0; i<equalShifts.size(); ++i) {
			int day = niceBegin.get(Calendar.DAY_OF_WEEK);

			if(day == equalShifts.get(i).getDay().getValue()) {
				return niceBegin;
			} else if(day < equalShifts.get(i).getDay().getValue()) {
				int goInFuture = equalShifts.get(i).getDay().getValue() - day;
				niceBegin.add(Calendar.DAY_OF_MONTH, goInFuture);
				return niceBegin;
			} else {
				if(i >= (equalShifts.size() - 1)) {
					//pomeri se za nedelju dana
					int goInFuture = day - equalShifts.get(0).getDay().getValue() + 1;
					niceBegin.add(Calendar.DAY_OF_MONTH, goInFuture);
				}					
			}
		}
		
		return niceBegin;
	}
}
