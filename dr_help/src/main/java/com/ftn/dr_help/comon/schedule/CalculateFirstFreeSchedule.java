package com.ftn.dr_help.comon.schedule;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

@Service
public class CalculateFirstFreeSchedule {
	
	@Autowired
	private NiceScheduleBeginning niceBeginning;
	
	@Autowired
	private CheckShift shift;
	
	@Autowired
	private DateConverter convert; // for debug only
	
	public Calendar checkScheduleOrFindFirstFree(DoctorPOJO doctor, Calendar begin, List<Date> dates) {
		
		Calendar check = findFreeSchedule(doctor, begin, dates, true);
		
		if(check == null) {
			//trazeni datum je zauzet; sad ponuditi prvi sledeci slobodan
			Calendar newBegin = Calendar.getInstance();
			newBegin.setTime(begin.getTime());
			newBegin.clear(Calendar.SECOND);
			newBegin.clear(Calendar.MILLISECOND);
			niceBeginning.setNiceScheduleBeginning(doctor, newBegin);
			
			//provera da novi pocetak ne pocne pre trazenog termina
			while(newBegin.compareTo(begin) < 0) {
				Calendar duration = Calendar.getInstance();
				duration.setTime(doctor.getProcedureType().getDuration());
				int hours = duration.get(Calendar.HOUR);
				int minutes = duration.get(Calendar.MINUTE);
				
				newBegin.add(Calendar.HOUR, hours);
				newBegin.add(Calendar.MINUTE, minutes);
				System.out.println("uvecakj " + convert.dateAndTimeToString(newBegin));
			}
			
			return findFreeSchedule(doctor, newBegin, dates, false);
		} else {
			return check;
		}
	}
	
	/*
	 * function uses doctor and schedule(begin) to check if it is free
	 * if the schedule(begin) is not free return the first free schedule after the given schedule(begin)
	 * */
	public Calendar findFirstScheduleForDoctor(DoctorPOJO doctor, Calendar begin, List<Date> dates) {
		
		//provera da li je begin schedule u dobroj smeni i u okruglom vremenu
		niceBeginning.setNiceScheduleBeginning(doctor, begin);
		
		//vrati prvi slobodan termin
		return findFreeSchedule(doctor, begin, dates, false);
	}
	
	private Calendar findFreeSchedule(DoctorPOJO doctor, Calendar begin, List<Date> dates, boolean justCheckDate) {
		if(!checkWorkingDay(doctor, begin)) {
			if(justCheckDate) {
				return null;
			} else {
				begin.add(Calendar.DAY_OF_MONTH, 1);
				niceBeginning.setNiceScheduleBeginning(doctor, begin);
			}
		}
		
		//nadje trajanje za schedule
		Calendar duration = Calendar.getInstance();
		duration.setTime(doctor.getProcedureType().getDuration());
		int hours = duration.get(Calendar.HOUR);
		int minutes = duration.get(Calendar.MINUTE);
		
		//najmanja jediniza za schedule je minuta 
		begin.clear(Calendar.SECOND);
		begin.clear(Calendar.MILLISECOND);

		//kraj schedula
		Calendar end = Calendar.getInstance();
		end.setTime(begin.getTime());
		end.clear(Calendar.SECOND);
		end.clear(Calendar.MILLISECOND);
		end.add(Calendar.HOUR, hours);
		end.add(Calendar.MINUTE, minutes);
		
		Calendar currentBegin = Calendar.getInstance();
		Calendar currentEnd = Calendar.getInstance();
		
		for(Date date : dates) {
			//iteriramo kroz zakazane termine; termini su sortirani 
			currentBegin.setTime(date);
			currentEnd.setTime(date);
			currentEnd.add(Calendar.HOUR, hours);
			currentEnd.add(Calendar.MINUTE, minutes);
			currentBegin.clear(Calendar.SECOND);
			currentBegin.clear(Calendar.MILLISECOND);
			currentEnd.clear(Calendar.SECOND);
			currentEnd.clear(Calendar.MILLISECOND);
			
			System.out.println("----------------------------------------------------");
			System.out.println("BEGIN: " + convert.dateAndTimeToString(begin) + begin.get(Calendar.AM_PM));
			System.out.println("END: " + convert.dateAndTimeToString(end) + end.get(Calendar.AM_PM));
			System.out.println("CURRENT BEGIN: " + convert.dateAndTimeToString(currentBegin) + currentBegin.get(Calendar.AM_PM));
			System.out.println("CURRENT END: " + convert.dateAndTimeToString(currentEnd) + currentEnd.get(Calendar.AM_PM));
			
			if(begin.compareTo(currentEnd) > 0)
				continue;
			
			//provera da li je termin zauzet
			if(end.compareTo(currentBegin) <= 0) {
				//termin je pre pocetka od tekucek zakazanog termina
				return begin;
			} else {
				//uzima se termin posle tekuceg zakazanog ili ako je u rezimu provere termina vrati null
				if(justCheckDate) return null;
				
				//provera da li je termin posle tekuceg u radnom vremenu
				if(!checkWorkingDay(doctor, currentEnd)) {
					niceBeginning.setNiceScheduleBeginning(doctor, currentEnd);
					
					if(currentEnd.compareTo(begin) < 0) {
						//vratio je za prethodni dan
						currentEnd.add(Calendar.DAY_OF_MONTH, 1);
						niceBeginning.setNiceScheduleBeginning(doctor, currentEnd);
					}
				}
				
				//postavi prvi slobodan termin za proveru
				begin.setTime(currentEnd.getTime());
				end.setTime(currentEnd.getTime());
				end.add(Calendar.HOUR, hours);
				end.add(Calendar.MINUTE, minutes);
				
			}
		}
		
		return begin;
	}
	
	/**
	 * provera da li doctor radi tog dana i da li je smena dobra
	 * */
	private boolean checkWorkingDay(DoctorPOJO doctor, Calendar schedule) {
		Calendar duration = Calendar.getInstance();
		duration.setTime(doctor.getProcedureType().getDuration());
		int hours = duration.get(Calendar.HOUR);
		int minutes = duration.get(Calendar.MINUTE);
		
		Calendar endSchedule = Calendar.getInstance();
		endSchedule.setTime(schedule.getTime());
		endSchedule.add(Calendar.HOUR, hours);
		endSchedule.add(Calendar.MINUTE, minutes-1);
		
		int day = schedule.get(Calendar.DAY_OF_WEEK);
		
		switch(day) {
		case Calendar.MONDAY:
			return shift.check(schedule, doctor.getMonday()) && shift.check(endSchedule, doctor.getMonday());
		case Calendar.TUESDAY:
			return shift.check(schedule, doctor.getTuesday()) && shift.check(endSchedule, doctor.getTuesday());
		case Calendar.WEDNESDAY:
			return shift.check(schedule, doctor.getWednesday()) && shift.check(endSchedule, doctor.getWednesday());
		case Calendar.THURSDAY:
			return shift.check(schedule, doctor.getThursday()) && shift.check(endSchedule, doctor.getThursday());
		case Calendar.FRIDAY:
			return shift.check(schedule, doctor.getFriday()) && shift.check(endSchedule, doctor.getFriday());
		case Calendar.SATURDAY:
			return shift.check(schedule, doctor.getSaturday()) && shift.check(endSchedule, doctor.getSaturday());
		case Calendar.SUNDAY:
			return shift.check(schedule, doctor.getSunday()) && shift.check(endSchedule, doctor.getSunday());
			
		default:
			return false;
		}
	}
	
}
