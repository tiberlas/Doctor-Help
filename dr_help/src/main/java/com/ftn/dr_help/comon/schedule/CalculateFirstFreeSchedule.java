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
				System.out.println("uvecaj " + convert.dateAndTimeToString(newBegin));
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
		if(niceBeginning == null) {
			niceBeginning = new NiceScheduleBeginning();
		}
		
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
			
			if(convert == null) {
				convert = new DateConverter();
			}
			
			System.out.println("----------------------------------------------------");
			System.out.println("BEGIN: " + convert.dateForFrontEndString(begin));
			System.out.println("END: " + convert.dateForFrontEndString(end));
			System.out.println("CURRENT BEGIN: " + convert.dateForFrontEndString(currentBegin));
			System.out.println("CURRENT END: " + convert.dateForFrontEndString(currentEnd));
			
			if(begin.compareTo(currentEnd) >= 0)
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
					
					if(currentEnd.compareTo(begin) <= 0) {
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
		
		if(shift == null) {
			shift = new CheckShift();
		}
		
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
	
	//OPERATION
	public Calendar findFirstScheduleForOperation(DoctorPOJO dr0, DoctorPOJO dr1, DoctorPOJO dr2, List<Date> dates0, List<Date> dates1, List<Date> dates2, Calendar begin) {
		/*
		 * vraca prvi datum koji odgovara svim lekarima
		 * 
		 * */
		try {
						
			//lsti dana u nedelji koja su zajednicka za doktore
			List<EqualDoctorShifts> equalWorkDays = shift.FindEqualDoctorShifts(dr0, dr1, dr2);
			if(equalWorkDays == null) {
				//mora druga kombinacija doktora
				Calendar notWorking = Calendar.getInstance();
				notWorking.set(Calendar.YEAR, 1984);
				
				return notWorking;
			}
			
			//podesi pocetni dan za trazenje zajednickog pocetka
			begin.set(Calendar.SECOND, 0);
			begin.set(Calendar.MILLISECOND, 0);

			//pocetak mora biti u okviru radnog dana
			Calendar begin0 = niceBeginning.setNiceOperationBegin(equalWorkDays, begin);
			Calendar begin1 = Calendar.getInstance();
			begin1.setTime(begin0.getTime());
			Calendar begin2 = Calendar.getInstance();
			begin2.setTime(begin1.getTime());
			
			Calendar free0 = null;
			Calendar free1 = null;
			Calendar free2 = null;
			
			Calendar check0 = findFreeSchedule(dr0, begin0, dates0, true);
			Calendar check1 = findFreeSchedule(dr1, begin0, dates1, true);
			Calendar check2 = findFreeSchedule(dr2, begin0, dates2, true);
			
			if(check0 != null && check1 != null && check2 != null) {
				//dati termin valja
				return begin0;
			}
			
			//nadji privi slobodan termin koji odgovara svim doctorima
			do {
				if(free0 != null) {
					//znaci da je jedna iteracija prosla; sad treba samo begin da se pomeri za najveci nadjeni datum
					
					if(free0.after(free1) && free0.after(free2)) {
						begin0.setTime(free0.getTime());
					} else if(free1.after(free2)) {
						begin0.setTime(free1.getTime());
					} else {
						begin0.setTime(free2.getTime());
					}
					
					if(shift.isInShift(begin0, equalWorkDays)) {
						//ovo je najveci datim sa zajednickim smenama
						//provera da li svim lekarima odgovara ova datum
						check0 = findFreeSchedule(dr0, begin0, dates0, true);
						check1 = findFreeSchedule(dr1, begin0, dates1, true);
						check2 = findFreeSchedule(dr2, begin0, dates2, true);
						
						if(check0 != null && check1 != null && check2 != null) {
							//svim lekarima odgovara nadjeni datim
							return begin0;
						}
					}
					
					begin0.add(Calendar.DAY_OF_MONTH, 1); //da bi algoritam progresovao
					begin0.set(Calendar.HOUR, 0);
					begin0.set(Calendar.MINUTE, 0);
					begin0.set(Calendar.AM_PM, Calendar.AM);
					
					begin1.setTime(begin0.getTime());
					begin2.setTime(begin0.getTime());
				}
				
				free0 = findFirstScheduleForDoctor(dr0, begin0, dates0);
				free1 = findFirstScheduleForDoctor(dr1, begin1, dates1);
				free2 = findFirstScheduleForDoctor(dr2, begin2, dates2);
				
				System.out.println("DEBUG FOR OPERATION");
				System.out.println(convert.dateForFrontEndString(free0));
				System.out.println(convert.dateForFrontEndString(free1));
				System.out.println(convert.dateForFrontEndString(free2));
			} while(! (free0.equals(free1) && free1.equals(free2)) );
		
			return begin0;
		} catch(Error e) {
			e.printStackTrace();
			return null;
		}
	} 
	
	private Calendar findFreeOperationSchedule(DoctorPOJO doctor, Calendar start, List<Date> dates, List<EqualDoctorShifts> equalWorkDays, boolean justCheckDate) {
		
		Calendar begin = niceBeginning.setNiceOperationBegin(equalWorkDays, start);
		
		//nadje trajanje za schedule
		Calendar duration = Calendar.getInstance();
		duration.setTime(doctor.getProcedureType().getDuration());
		int hours = duration.get(Calendar.HOUR);
		int minutes = duration.get(Calendar.MINUTE);
		
		//najmanja jediniza za schedule je minuta 
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);

		//kraj schedula
		Calendar end = Calendar.getInstance();
		end.setTime(begin.getTime());
		end.set(Calendar.SECOND, 0);
		end.set(Calendar.MILLISECOND, 0);
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
			currentBegin.set(Calendar.SECOND, 0);
			currentBegin.set(Calendar.MILLISECOND, 0);
			currentEnd.set(Calendar.SECOND, 0);
			currentEnd.set(Calendar.MILLISECOND, 0);
			
			if(convert == null) {
				convert = new DateConverter();
			}
			
			System.out.println("----------------------------------------------------");
			System.out.println("BEGIN: " + convert.dateForFrontEndString(begin));
			System.out.println("END: " + convert.dateForFrontEndString(end));
			System.out.println("CURRENT BEGIN: " + convert.dateForFrontEndString(currentBegin));
			System.out.println("CURRENT END: " + convert.dateForFrontEndString(currentEnd));
			
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
				if(!checkWorkingDayForOperation(currentEnd, equalWorkDays)) {
					currentEnd = niceBeginning.setNiceOperationBegin(equalWorkDays, currentEnd);
					
					if(currentEnd.compareTo(begin) < 0) {
						//vratio je za prethodni dan
						currentEnd.add(Calendar.DAY_OF_MONTH, 1);
						currentEnd = niceBeginning.setNiceOperationBegin(equalWorkDays, currentEnd);					}
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
	
	private boolean checkWorkingDayForOperation(Calendar date, List<EqualDoctorShifts> equalWorkDays) {
		/*
		 * returns true if the date is OK(on work day and in work shift)
		 * */
		
		for(EqualDoctorShifts days :equalWorkDays) {
			if(date.get(Calendar.DAY_OF_WEEK) == days.getDay().getValue()) {
				Calendar begin = Calendar.getInstance();
				Calendar end = Calendar.getInstance();
				
				begin.setTime(date.getTime());
				end.setTime(date.getTime());
				
				begin.set(Calendar.SECOND, 0);
				begin.set(Calendar.MILLISECOND, 0);
				begin.set(Calendar.MINUTE, 0);
				end.set(Calendar.SECOND, 0);
				end.set(Calendar.MILLISECOND, 0);
				end.set(Calendar.MINUTE, 0);
				
				switch(days.getShift()) {
					case FIRST: 
						begin.set(Calendar.HOUR, 8);
						begin.set(Calendar.AM_PM, Calendar.AM);
						end.set(Calendar.HOUR, 16);
						end.set(Calendar.AM_PM, Calendar.PM);
						break;
					case SECOND: 
						begin.set(Calendar.HOUR, 16);
						begin.set(Calendar.AM_PM, Calendar.PM);
						end.set(Calendar.HOUR, 00);
						end.set(Calendar.AM_PM, Calendar.AM);
						break;
					case THIRD: 
						begin.set(Calendar.HOUR, 00);
						begin.set(Calendar.AM_PM, Calendar.AM);
						end.set(Calendar.HOUR, 8);
						end.set(Calendar.AM_PM, Calendar.AM);
						break;
					default:
						return false;
				}
				
				if(date.compareTo(begin) >= 0 && date.compareTo(end) <= 0) {
					return true;
				} else {
					return false;
				}
			}
			
		}
		
		return false;
	}
	
}
