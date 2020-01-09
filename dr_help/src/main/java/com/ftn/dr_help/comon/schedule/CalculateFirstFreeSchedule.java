package com.ftn.dr_help.comon.schedule;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.DoctorRepository;

@Service
public class CalculateFirstFreeSchedule {

	@Autowired
	private DoctorRepository repository;
	
	@Autowired
	private NiceScheduleBeginning niceBeginning;
	
	@Autowired
	private CheckShift shift;
	
	@Autowired
	private DateConverter convert; // for debug only
	
	/*
	 * function uses doctor and schedule(begin) to check if it is free
	 * if the schedule(begin) is not free return the first free schedule after the given schedule(begin)
	 * */
	public Calendar findFirstScheduleForDoctor(DoctorPOJO doctor, Calendar begin, List<Date> dates) {
		
		//provera da li je begin schedule u dobroj smeni i u okruglom vremenu
		niceBeginning.setNiceScheduleBeginning(doctor, begin);
		
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
		//List<Date> dates = repository.findAllReservedAppointments(doctor.getId());
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
				System.out.println(1);
				//termin je pre pocetka od tekucek zakazanog termina
				return begin;
			} else {
				//uzima se termin posle tekuceg zakazanog
				
				//provera da li je termin posle tekuceg u radnom vremenu
				if(!checkWorkingDay(doctor, currentEnd)) {
				System.out.println(2);
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
			
//			if(current.compareTo(begin) >= 0) {
//				System.out.println(1);
//				//prvi termin koji je posle trazenog pocetka iji je bas taj trazeni
//				if(current.compareTo(end) <= 0) {
//					System.out.println(2);
//					//ovaj termin pocinje posle kraja trazenog termina; znaci trazeni termin je prvi slobodni
//					
//					//provera da li ovaj termin fizicki odgovara doktoru
//					if(checkWorkingDay(doctor, begin)) {
//						System.out.println(4);
//						return begin;
//					} else {
//						System.out.println(5);
//						//treba uzeti sledeci termin
//						begin.setTime(end.getTime());
//						end.add(Calendar.HOUR, hours);
//						end.add(Calendar.MINUTE, minutes);
//					}
//					
//				} else {
//					System.out.println(6);
//					//definise se novi trazeni termin koji pocinje posle zavrsetka tekuceg
//					begin.setTime(date); //kraj tekuceg termina
//					begin.add(Calendar.HOUR, hours);
//					begin.add(Calendar.MINUTE, minutes);
//					
//					end.setTime(date);
//					end.add(Calendar.HOUR, hours*2);
//					end.add(Calendar.MINUTE, minutes*2);
//				}
//			}
		}
		
		return begin;
	}
	
	/**
	 * provera da li doctor radi tog dana i da li je smena dobra
	 * */
	private boolean checkWorkingDay(DoctorPOJO doctor, Calendar schedule) {
		
		int day = schedule.get(Calendar.DAY_OF_WEEK);
		
		switch(day) {
		case Calendar.MONDAY:
			return shift.check(schedule, doctor.getMonday());
		case Calendar.TUESDAY:
			return shift.check(schedule, doctor.getTuesday());
		case Calendar.WEDNESDAY:
			return shift.check(schedule, doctor.getWednesday());
		case Calendar.THURSDAY:
			return shift.check(schedule, doctor.getThursday());
		case Calendar.FRIDAY:
			return shift.check(schedule, doctor.getFriday());
		case Calendar.SATURDAY:
			return shift.check(schedule, doctor.getSaturday());
		case Calendar.SUNDAY:
			return shift.check(schedule, doctor.getSunday());
			
		default:
			return false;
		}
	}
	
}
