package com.ftn.dr_help.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Calendar;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.ftn.dr_help.model.enums.AppointmentStateEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AppointmentRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Test
	@Transactional
	@Rollback(true)
	public void testInsertOne() {
		List<AppointmentPOJO> before;
		List<AppointmentPOJO> after;
		
		before = appointmentRepository.getAllRequests();
		
		List<DoctorPOJO> doctors = doctorRepository.findAll();

		AppointmentPOJO appointment = new AppointmentPOJO();
		appointment.setDate(Calendar.getInstance());
		appointment.setDeleted(false);
		appointment.setDoctor(doctors.get(0));
		appointment.setProcedureType(doctors.get(0).getProcedureType());
		appointment.setNurse(null);
		appointment.setStatus(AppointmentStateEnum.DOCTOR_REQUESTED_APPOINTMENT);
		appointment.setPatient(null);
		appointment.setDiscount(0);
		appointment.setRoom(null);
		appointment.setVersion(1l);
		
		entityManager.persist(appointment);
		
		after = appointmentRepository.getAllRequests();
		
		assertEquals(before.size()+1, after.size());
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void testApproveOne() {
		List<AppointmentPOJO> before;
		List<AppointmentPOJO> after;
		
		before = appointmentRepository.getAllRequests();
		
		before.get(0).setStatus(AppointmentStateEnum.APPROVED);
		//before.get(0).setVersion(1l);
		entityManager.merge(before.get(0));
		
		after = appointmentRepository.getAllRequests();
		
		assertEquals(before.size()-1, after.size());
	}

	@Test
	@Transactional
	@Rollback(true)
	public void testOnlyOne() {
		List<AppointmentPOJO> before;
		List<AppointmentPOJO> after;
		
		before = appointmentRepository.getAllRequests();
		for(AppointmentPOJO appointment : before) {
			appointment.setStatus(AppointmentStateEnum.APPROVED);
			entityManager.merge(appointment);
		}
		
		List<DoctorPOJO> doctors = doctorRepository.findAll();

		AppointmentPOJO appointment = new AppointmentPOJO();
		appointment.setDate(Calendar.getInstance());
		appointment.setDeleted(false);
		appointment.setDoctor(doctors.get(0));
		appointment.setProcedureType(doctors.get(0).getProcedureType());
		appointment.setNurse(null);
		appointment.setStatus(AppointmentStateEnum.DOCTOR_REQUESTED_APPOINTMENT);
		appointment.setPatient(null);
		appointment.setDiscount(0);
		appointment.setRoom(null);
		appointment.setVersion(1l);
		
		entityManager.persist(appointment);
		
		after = appointmentRepository.getAllRequests();
		
		assertEquals(1, after.size());
	}
	
	@Test
	@Transactional
	@Rollback(true)
	public void testEmptyList() {
		List<AppointmentPOJO> before;
		List<AppointmentPOJO> after;
		
		before = appointmentRepository.getAllRequests();
		for(AppointmentPOJO appointment : before) {
			appointment.setStatus(AppointmentStateEnum.APPROVED);
			entityManager.merge(appointment);
		}
		
		after = appointmentRepository.getAllRequests();
		
		assertTrue(after.isEmpty());
	}
}
