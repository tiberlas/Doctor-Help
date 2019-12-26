package com.ftn.dr_help.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentPOJO, Long>{

	AppointmentPOJO findOneByExaminationReportId (Long examinationReportId);
//	
//	@Query(value = "select a from appointments a where a.status = 'DONE' and a.nurse_id = ?1")
//	public List<AppointmentPOJO> findDoneAppointmentsByNurseId(Long nurseId);
}
