package com.ftn.dr_help;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.validation.ClinicValidation;
//import org.springframework.boot.test.context.SpringBootTest;

//@SpringBootTest
class DrHelpApplicationTests {
	
	private ClinicDTO clinic = new ClinicDTO(1L, "IME", "25 despot", "NOVI SAD", "SERBIA", "NESTO");;
	
	@Autowired
	private ClinicValidation validation;
	
	@Test
	void shouldPass() {
		System.out.println(clinic.getAddress());
		boolean ret = validation.isValid(clinic);
		assertEquals(true, ret);
	}
	
//	@Test
//	void errorEmptyAddres() {
//		clinic.setAddress("");
//		boolean ret = validation.isValid(clinic);
//		assertEquals(false, ret);
//	}
//	
//	@Test
//	void errorNotNumberInAddres() {
//		clinic.setAddress("abcd");
//		boolean ret = validation.isValid(clinic);
//		assertEquals(false, ret);
//	}
//	
//	@Test
//	void errorNullAddres() {
//		clinic.setAddress(null);
//		boolean ret = validation.isValid(clinic);
//		assertEquals(false, ret);
//	}

}
