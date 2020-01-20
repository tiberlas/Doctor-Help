package com.ftn.dr_help.comon;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.ParseException;
import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class DateConverterTest {

	@Autowired
	private DateConverter convertor;
	
	@Test
	void testPMShouldPass() {
		try {
			Calendar date = convertor.stringToDate("2020-05-13 20:30");
			Calendar expected = Calendar.getInstance();
			expected.set(Calendar.YEAR, 2020);
			expected.set(Calendar.MONTH, 4);
			expected.set(Calendar.DAY_OF_MONTH, 13);
			expected.set(Calendar.HOUR, 8);
			expected.set(Calendar.MINUTE, 30);
			expected.set(Calendar.AM_PM, Calendar.PM);
			expected.clear(Calendar.SECOND);
			expected.clear(Calendar.MILLISECOND);
			
			assertEquals(expected, date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Test
	void testAMShouldPass() {
		try {
			Calendar date = convertor.stringToDate("2020-05-13 9:36");
			Calendar expected = Calendar.getInstance();
			expected.set(Calendar.YEAR, 2020);
			expected.set(Calendar.MONTH, 4);
			expected.set(Calendar.DAY_OF_MONTH, 13);
			expected.set(Calendar.HOUR, 9);
			expected.set(Calendar.MINUTE, 36);
			expected.set(Calendar.AM_PM, Calendar.AM);
			expected.clear(Calendar.SECOND);
			expected.clear(Calendar.MILLISECOND);
			
			assertEquals(expected, date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
