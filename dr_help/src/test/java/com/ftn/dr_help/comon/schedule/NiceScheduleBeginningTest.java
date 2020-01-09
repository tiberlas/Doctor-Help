package com.ftn.dr_help.comon.schedule;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Calendar;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

@SpringBootTest
public class NiceScheduleBeginningTest {

	@Autowired
	private NiceScheduleBeginning schedule;
	
	private DoctorPOJO doctor = new DoctorPOJO();
	
	private Calendar cal = Calendar.getInstance();
	
	@BeforeEach
	public void setUp() {
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		cal.set(Calendar.YEAR, 2020);
		cal.set(Calendar.MONTH, 0); //januar
		
		doctor.setMonday(Shift.FIRST);
		doctor.setTuesday(Shift.FIRST);
		doctor.setWednesday(Shift.FIRST);
		doctor.setThursday(Shift.FIRST);
		doctor.setFriday(Shift.FIRST);
		doctor.setSaturday(Shift.NONE);
		doctor.setSunday(Shift.NONE);
	}
	
	@Test
	public void testShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 9); //thursday
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 9 && hours == 8 && minutes == 0 && m == Calendar.AM);
	}
	
	@Test
	public void testNextWeekShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 11); //saturday
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 13 && hours == 8 && minutes == 0 && m == Calendar.AM);
	}
	
	@Test
	public void testNextDayShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 9); //thursday
		doctor.setThursday(Shift.NONE);
		doctor.setFriday(Shift.FIRST);
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 10 && hours == 8 && minutes == 0 && m == Calendar.AM);
	}
	
	@Test
	public void testSecondShiftShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 13); //monday
		doctor.setMonday(Shift.SECOND);
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 13 && hours == 4 && minutes == 0 && m == Calendar.PM);
	}

	@Test
	public void testSecondShiftAgainShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 15); //wednesday
		doctor.setWednesday(Shift.NONE);
		doctor.setThursday(Shift.SECOND);
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 16 && hours == 4 && minutes == 0 && m == Calendar.PM);
	}
	
	@Test
	public void testThirdShiftShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 14); //tuesday
		doctor.setTuesday(Shift.THIRD);
		
		schedule.setNiceScheduleBeginning(doctor, cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 14 && hours == 0 && minutes == 0 && m == Calendar.AM);
	}
	
	
}
