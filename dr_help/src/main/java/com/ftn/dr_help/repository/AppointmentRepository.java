package com.ftn.dr_help.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentPOJO, Long>{

	AppointmentPOJO findOneByExaminationReportId (Long examinationReportId);
	
//	@Query(value = "select a from appointments a where a.status = 'DONE' and a.nurse_id = ?1")
//	public List<AppointmentPOJO> findDoneAppointmentsByNurseId(Long nurseId);
	
	@Query(value = "select a.date from appointments a where a.deleted = FALSE and a.room_id = ?1 order by a.date", nativeQuery = true)
	public List<Date> findScheduledDatesOfRoom(Long roomId);
}
