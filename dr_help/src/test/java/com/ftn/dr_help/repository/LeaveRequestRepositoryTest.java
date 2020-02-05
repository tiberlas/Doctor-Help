package com.ftn.dr_help.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.model.enums.LeaveStatusEnum;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.LeaveRequestPOJO;

@RunWith(SpringRunner.class)
@DataJpaTest
public class LeaveRequestRepositoryTest {

	@Autowired
	private TestEntityManager em;
	
	@Autowired
	private LeaveRequestRepository leaveRequestRepository;
	
	private LeaveRequestPOJO leaveRequest;
	private LeaveRequestPOJO leaveRequest1;
	private LeaveRequestPOJO leaveRequest2;
	
	private List<LeaveRequestPOJO> expectedList;
	
	@Before
	public void setUp() {
		DoctorPOJO doctor = new DoctorPOJO();
		doctor.setId(101l);
		
		Calendar start = Calendar.getInstance();
		Calendar end = Calendar.getInstance();
		
		start.set(2020, 1, 20, 0, 0, 0);
		end.set(2020, 1, 24, 0, 0, 0);
		
		leaveRequest = new LeaveRequestPOJO();
		leaveRequest.setDoctor(doctor);
		leaveRequest.setNurse(null);
		leaveRequest.setFirstDay(start);
		leaveRequest.setLastDay(end);
		leaveRequest.setLeaveStatus(LeaveStatusEnum.APPROVED);
		
		start.set(2020, 1, 24, 0, 0, 0);
		end.set(2020, 1, 27, 0, 0, 0);
		
		leaveRequest1 = new LeaveRequestPOJO();
		leaveRequest1.setDoctor(doctor);
		leaveRequest1.setNurse(null);
		leaveRequest1.setFirstDay(start);
		leaveRequest1.setLastDay(end);
		leaveRequest1.setLeaveStatus(LeaveStatusEnum.APPROVED);
		
		start.set(2020, 2, 10, 0, 0, 0);
		end.set(2020, 2, 15, 0, 0, 0);
		
		leaveRequest2 = new LeaveRequestPOJO();
		leaveRequest2.setDoctor(doctor);
		leaveRequest2.setNurse(null);
		leaveRequest2.setFirstDay(start);
		leaveRequest2.setLastDay(end);
		leaveRequest2.setLeaveStatus(LeaveStatusEnum.APPROVED);
		
		expectedList = new ArrayList<>();
		expectedList.add(leaveRequest);
		expectedList.add(leaveRequest1);
		expectedList.add(leaveRequest2);
	}
	
	@Test
	public void test() throws Exception{
		
		em.persist(leaveRequest);
		//this.em.persist(leaveRequest1);
		//this.em.persist(leaveRequest2);
		
		Calendar date = Calendar.getInstance();
		date.set(2020, 1, 18, 0, 0, 0);
		
		List<LeaveRequestPOJO> finded = leaveRequestRepository.findAllForDoctor(101l, date.getTime());
		
		assertEquals(leaveRequest, finded.get(0));
		//assertEquals(expectedList, finded);
	}

}
