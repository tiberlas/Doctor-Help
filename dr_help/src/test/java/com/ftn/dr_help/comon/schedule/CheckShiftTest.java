package com.ftn.dr_help.comon.schedule;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ftn.dr_help.model.enums.Shift;

@SpringBootTest
public class CheckShiftTest {

	@Autowired
	private CheckShift calculate;
	
	private Calendar cal = Calendar.getInstance();
	
	@Test
	void shiftShouldPass() {
		cal.set(Calendar.HOUR, 9);
		cal.set(Calendar.AM_PM, Calendar.AM);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftLowerBoundryShouldPass() {
		cal.set(Calendar.HOUR, 8);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftCloseToUpperBoundryShouldPass() {
		cal.set(Calendar.HOUR, 3);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftUpperBoundryShouldPass() {
		cal.set(Calendar.HOUR, 4);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftUpperBoundryShouldFAIL() {
		cal.set(Calendar.HOUR, 4);
		cal.set(Calendar.MINUTE, 1);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftLowerBoundryShouldFAIL() {
		cal.set(Calendar.HOUR, 7);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftShouldFAIL() {
		cal.set(Calendar.HOUR, 9);
		cal.set(Calendar.MINUTE, 30);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.FIRST);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftSecondShouldFAIL() {
		cal.set(Calendar.HOUR, 2);
		cal.set(Calendar.MINUTE, 15);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.SECOND);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftSecondShouldPass() {
		cal.set(Calendar.HOUR, 6);
		cal.set(Calendar.MINUTE, 15);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.SECOND);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftSecondCloseToMidthNightShouldPass() {
		cal.set(Calendar.HOUR, 11);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.SECOND);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftSecondMidthNightShouldFAIL() {
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.AM_PM, Calendar.PM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.SECOND);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftSecondAfterMidthNightShouldFAIL() {
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 1);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.SECOND);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftThirdUpperShouldFAIL() {
		cal.set(Calendar.HOUR, 11);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertFalse(retVal);
	}
	
	@Test
	void shiftThirdLowerShouldFAIL() {
		cal.set(Calendar.HOUR, 8);
		cal.set(Calendar.MINUTE, 1);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertFalse(retVal);
	}

	@Test
	void shiftThirdUpperShouldPass() {
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftThirdLowerShouldPass() {
		cal.set(Calendar.HOUR, 8);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftThirdShouldPass() {
		cal.set(Calendar.HOUR, 3);
		cal.set(Calendar.MINUTE, 30);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertTrue(retVal);
	}
	
	@Test
	void shiftThirdAgainShouldPass() {
		cal.set(Calendar.HOUR, 0);
		cal.set(Calendar.MINUTE, 30);
		cal.set(Calendar.AM_PM, Calendar.AM);
		cal.clear(Calendar.SECOND);
		cal.clear(Calendar.MILLISECOND);
		
		boolean retVal = calculate.check(cal, Shift.THIRD);
		
		assertTrue(retVal);
	}


}
