package com.ftn.dr_help.service;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith (SpringRunner.class)
@SpringBootTest
public class ClinicServiceTest {

	@InjectMocks
	@Autowired
	private ClinicService clinicService;
	
	@Before 
	public void setUp () {
		
	}
	
	@Test
	public void findAllClinicsShouldPass () {
		
	}
	
}
