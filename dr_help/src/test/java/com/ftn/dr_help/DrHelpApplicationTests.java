package com.ftn.dr_help;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.runner.RunWith;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.model.pojo.NursePOJO;

@RunWith(SpringRunner.class)
@SpringBootTest
class DrHelpApplicationTests {

	@Test
	void shouldNotPass() {
		NursePOJO nurse = new NursePOJO();
		nurse.setFirstName("ANA");

		assertEquals("ANA", nurse.getFirstName());
	}

	@Test
	void shouldPass() {
		NursePOJO nurse = new NursePOJO();
		nurse.setFirstName("ANA");

		assertEquals("ANA", nurse.getFirstName());
	}
	
}
