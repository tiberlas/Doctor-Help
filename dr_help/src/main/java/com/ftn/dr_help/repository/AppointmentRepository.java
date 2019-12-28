package com.ftn.dr_help.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentPOJO, Long>{

	AppointmentPOJO findOneByExaminationReportId (Long examinationReportId);
	
	AppointmentPOJO findOneById(Long id);
	
	@Query(value = "select distinct a.* from appointments a inner join doctors d on a.doctor_id = ?1", nativeQuery = true)
	public List<AppointmentPOJO> findDoctorAppointments(Long doctor_id);
}
