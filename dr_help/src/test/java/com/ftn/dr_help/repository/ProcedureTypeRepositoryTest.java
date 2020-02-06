package com.ftn.dr_help.repository;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ProcedureTypeRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private ProcedureTypeRepository procedureTypeRepository;

	@Before
	public void setUpe () {}
	
	@Test
	public void testGetPrice () {
		
		Double actualValue1 = procedureTypeRepository.getPrice(1L, "Psychotherapy");
		Double actualValue2 = procedureTypeRepository.getPrice(5L, "Psychotherapy");
		Double actualValue3 = procedureTypeRepository.getPrice(1L, "Phrenollogy");
		
		assertEquals (30, actualValue1.floatValue(), 0.001);
		assertEquals (35, actualValue2.floatValue(), 0.001);
		assertEquals (null, actualValue3);
		
	}
	
	@Test
	public void testGetProcedureTypes () {
		List<String> actualTypes1 = procedureTypeRepository.getProcedureTypes();

//		General exam
//		Hearing exam
//		Orthopetic exam
//		Psychotherapy

		assertEquals (4, actualTypes1.size());
	}
	
	
}
