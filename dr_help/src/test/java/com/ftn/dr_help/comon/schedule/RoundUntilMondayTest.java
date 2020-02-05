package com.ftn.dr_help.comon.schedule;

import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.comon.DateConverter;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RoundUntilMondayTest {

	@Autowired
	private RoundUntilMonday round;
	
	@Autowired
	private DateConverter dateConvertor;
	
	@Test
	public void test() {
		Calendar date = Calendar.getInstance();
		date.set(2020, 1, 4, 0, 0);
		
		Calendar actual = round.round(date);
		
		Calendar expected = Calendar.getInstance();
		expected.set(2020, 1, 10, 0, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(dateConvertor.dateForFrontEndString(expected), dateConvertor.dateForFrontEndString(actual));
	}
	
	@Test
	public void testSunday() {
		Calendar date = Calendar.getInstance();
		date.set(2020, 1, 9, 0, 0);
		
		Calendar actual = round.round(date);
		
		Calendar expected = Calendar.getInstance();
		expected.set(2020, 1, 10, 0, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(dateConvertor.dateForFrontEndString(expected), dateConvertor.dateForFrontEndString(actual));
	}
	
	@Test
	public void testSaturday() {
		Calendar date = Calendar.getInstance();
		date.set(2020, 1, 8, 0, 0);
		
		Calendar actual = round.round(date);
		
		Calendar expected = Calendar.getInstance();
		expected.set(2020, 1, 10, 0, 0);
		expected.set(Calendar.MILLISECOND, 0);
		
		assertEquals(dateConvertor.dateForFrontEndString(expected), dateConvertor.dateForFrontEndString(actual));
	}


}
