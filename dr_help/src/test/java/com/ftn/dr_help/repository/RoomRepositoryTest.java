package com.ftn.dr_help.repository;

import static org.junit.Assert.fail;

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

import com.ftn.dr_help.model.pojo.RoomPOJO;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource("classpath:application-test.properties")
public class RoomRepositoryTest {

	@Autowired
	private RoomRepository RoomRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Test
	@Transactional
	@Rollback(true)
	public void test() {
		List<RoomPOJO> before;
		List<RoomPOJO> after;
		
		before = RoomRepository.getAllReservedRooms();
		
		entityManager.merge(before.get(0));
	}

}
