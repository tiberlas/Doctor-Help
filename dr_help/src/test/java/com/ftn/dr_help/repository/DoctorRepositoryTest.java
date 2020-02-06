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

import com.ftn.dr_help.model.pojo.DoctorPOJO;

@RunWith(SpringRunner.class)
@DataJpaTest
public class DoctorRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Before
	public void setUp () {
		
	}
	
	@Test
	public void testFindAllByClinic_id () {
		
		List<DoctorPOJO> actualList = doctorRepository.findAllByClinic_id(1L);
		
		assertEquals (4, actualList.size());
	}
	
	@Test
	public void testFilterByClinicAndProcedureType () {
		
		List<DoctorPOJO> actualList = doctorRepository.filterByClinicAndProcedureType(1L, "Psychotherapy");
		
		assertEquals (1, actualList.size());
	}
	
}
