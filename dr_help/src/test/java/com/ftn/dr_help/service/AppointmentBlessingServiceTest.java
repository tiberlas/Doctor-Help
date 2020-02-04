package com.ftn.dr_help.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppointmentBlessingServiceTest {

	@Autowired
	private DateConverter dateConvertor;
	
	@Test
	public void testShouldPass() {
		Calendar cal = Calendar.getInstance();
		cal.set(2020, 0, 12, 15, 23, 0);
		String actual = dateConvertor.dateForFrontEndString(cal);
		
		assertEquals("01/12/2020 03:23 PM", actual);
	}

}
