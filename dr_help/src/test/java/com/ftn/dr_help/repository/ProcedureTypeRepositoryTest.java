package com.ftn.dr_help.repository;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource("classpath:application-test.properties")
public class ProcedureTypeRepositoryTest {

	@Autowired
	private ProcedureTypeRepository procedureTypeRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	@Transactional
	@Rollback(true)
	public void testGetAll() {
		List<String> before;
		List<String> after;
		
		before = procedureTypeRepository.getProcedureTypes();
		
		ProceduresTypePOJO procedure = procedureTypeRepository.getOne(1l);
		procedure.setDeleted(true);
		entityManager.merge(procedure);
		
		after = procedureTypeRepository.getProcedureTypes();
		
		assertEquals(before.size()-1, after.size());
	}

}
