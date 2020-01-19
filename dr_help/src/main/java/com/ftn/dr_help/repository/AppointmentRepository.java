package com.ftn.dr_help.repository;

import java.util.Date;

import java.util.Calendar;
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
	
	@Query(value="select a.* from appointments a where a.doctor_id = ?1 and a.patient_id = ?2 and a.status = 'APPROVED'", nativeQuery = true)
	public List<AppointmentPOJO> findApprovedDoctorAppointmentsForPatientWithId(Long doctor_id, Long patient_id);
	
	@Query(value = "select a.date from appointments a where a.deleted = FALSE and a.status <> 'DONE' and a.room_id = ?1 order by a.date", nativeQuery = true)
	public List<Date> findScheduledDatesOfRoom(Long roomId);

	@Query (value = "select distinct a.* from ((clinic c inner join doctors d on c.id = d.clinic_id) inner join appointments a on d.id = a.doctor_id) inner join procedures_type pt on pt.id = d.procedure_type_id where c.id = ?1 and a.\"date\" between ?2 and ?3 and a.deleted = false and pt.\"name\" = ?4", nativeQuery = true)
	List<AppointmentPOJO> getClinicsAppointments (Long clinicId, Calendar calendarMin, Calendar calendarMax, String procedureName);
	
	@Query (value = "select * from appointments a where doctor_id = ?1 and deleted = false and date between ?2 and ?3", nativeQuery = true)
	List<AppointmentPOJO> getDoctorsAppointments (Long doctorId, Calendar calendarMin, Calendar calendarMax); 
	
	@Query( value = "select distinct a.* from doctors d inner join doctor_requested dr on (d.id = dr.doctor_id) inner join appointments a on (a.id = dr.appointment_id) where d.email= ?1 and a.id= ?2", nativeQuery = true)
	AppointmentPOJO getRequestedAppointment(String doctorEmail, Long id);

	@Query(value = "select a.* from \n" + 
			"	appointments a inner join doctors d on d.id = a.doctor_id \n" + 
			"	inner join clinic_administrator ca on ca.clinic_id = d.clinic_id\n" + 
			"	where (a.status = 'REQUESTED' or a.status = 'DOCTOR_REQUESTED_APPOINTMENT') and (ca.email = ?1) order by a.id", nativeQuery = true)
	List<AppointmentPOJO> getAllRequests(String clinicAdminMail);

	@Query(value = "select a.* from appointments a \n" + 
			"where a.status = 'AVAILABLE' \n" + 
			"and a.deleted = false", nativeQuery = true)
	List<AppointmentPOJO> findAllPredefined();
}
