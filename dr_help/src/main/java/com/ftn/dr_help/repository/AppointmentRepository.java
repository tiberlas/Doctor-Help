package com.ftn.dr_help.repository;


import java.util.Calendar;
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
	
	@Query (value = "select distinct a.* from ((clinic c inner join doctors d on c.id = d.clinic_id) inner join appointments a on d.id = a.doctor_id) inner join procedures_type pt on pt.id = d.procedure_type_id where c.id = ?1 and a.\"date\" between ?2 and ?3 and a.deleted = false and pt.\"name\" = ?4", nativeQuery = true)
	List<AppointmentPOJO> getClinicsAppointments (Long clinicId, Calendar calendarMin, Calendar calendarMax, String procedureName);
	
	@Query (value = "select * from appointments a where doctor_id = ?1 and deleted = false and date between ?2 and ?3", nativeQuery = true)
	List<AppointmentPOJO> getDoctorsAppointments (Long doctorId, Calendar calendarMin, Calendar calendarMax); 
	
}
