package com.ftn.dr_help.comon.schedule;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ftn.dr_help.model.convertor.WorkScheduleAdapter;
import com.ftn.dr_help.model.enums.DayEnum;
import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;

@SpringBootTest
public class NiceScheduleBeginningTest {

	@Autowired
	private NiceScheduleBeginning schedule;
	
	@Autowired
	private WorkScheduleAdapter adapter;
	
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
		
		Calendar duration = Calendar.getInstance();
		duration.set(Calendar.HOUR, 1);
		ProceduresTypePOJO procedure = new ProceduresTypePOJO();
		procedure.setDuration(duration.getTime());
		doctor.setProcedureType(procedure);
	}
	
	@Test
	public void testShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 9); //thursday
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 9 && hours == 8 && minutes == 0 && m == Calendar.AM);
	}
	
	@Test
	public void testNextWeekShouldPass() {
		cal.set(Calendar.DAY_OF_MONTH, 11); //saturday
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
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
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
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
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
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
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
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
		
		schedule.setNiceScheduleBeginning(adapter.fromDoctor(doctor), cal);
		
		int day = cal.get(Calendar.DAY_OF_MONTH);
		int m = cal.get(Calendar.AM_PM);
		int hours = cal.get(Calendar.HOUR);
		int minutes = cal.get(Calendar.MINUTE);
		
		assertTrue(day == 14 && hours == 0 && minutes == 0 && m == Calendar.AM);
	}
	
	@Test
	public void testOperation1() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.MONDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.TUESDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.WEDNESDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 20); //ponedeljak
		expected.set(Calendar.HOUR, 0);
		expected.set(Calendar.MINUTE, 0);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
	
	@Test
	public void testOperation2() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.FRIDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.SATURDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 17); //ponedeljak
		expected.set(Calendar.HOUR, 0);
		expected.set(Calendar.MINUTE, 0);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
	
	@Test
	public void testOperation3() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.TUESDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.SUNDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 19); 
		expected.set(Calendar.HOUR, 0);
		expected.set(Calendar.MINUTE, 0);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
	
	@Test
	public void testOperation4() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.MONDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.TUESDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.SATURDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 18);
		expected.set(Calendar.HOUR, 0);
		expected.set(Calendar.MINUTE, 0);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
	
	@Test
	public void testOperation5() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.TUESDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.THURSDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.SUNDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 16); 
		expected.set(Calendar.HOUR, 0);
		expected.set(Calendar.MINUTE, 0);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
	
	@Test
	public void testOperation6() {
		Calendar begin = Calendar.getInstance();
		begin.set(Calendar.MONTH, Calendar.JANUARY);
		begin.set(Calendar.DAY_OF_MONTH, 16); //thursday
		begin.set(Calendar.HOUR, 10);
		begin.set(Calendar.MINUTE, 32);
		begin.set(Calendar.SECOND, 0);
		begin.set(Calendar.MILLISECOND, 0);
		
		List<EqualDoctorShifts> equalShifts = new ArrayList<>();
		equalShifts.add(new EqualDoctorShifts(DayEnum.TUESDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.THURSDAY, Shift.FIRST));
		equalShifts.add(new EqualDoctorShifts(DayEnum.SUNDAY, Shift.FIRST));
		
		Calendar finded = schedule.setNiceOperationBegin(equalShifts, begin);
		Calendar expected = Calendar.getInstance();
		expected.set(Calendar.MONTH, Calendar.JANUARY);
		expected.set(Calendar.DAY_OF_MONTH, 16); 
		expected.set(Calendar.HOUR, 10);
		expected.set(Calendar.MINUTE, 32);
		expected.set(Calendar.SECOND, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(expected, finded);
	}
}
