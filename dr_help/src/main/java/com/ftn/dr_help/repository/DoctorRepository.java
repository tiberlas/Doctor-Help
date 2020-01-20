package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.HealthRecordPOJO;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorPOJO, Long> {
	
	public List<DoctorPOJO> findAllByClinic_id(Long id);
	public DoctorPOJO findOneByEmail (String email);

	@Query (value = "select d.* from doctors d inner join procedures_type pt on d.procedure_type_id = pt.id where d.clinic_id = ?1 and pt.\"name\" = ?2", nativeQuery = true)
	public List<DoctorPOJO> filterByClinicAndProcedureType (Long clinicId, String procedureType);
	
	//pronalazenje istorije pregleda kod prosledjenog lekara i prosledjenog pacijenta, 
	//sluzi za prikaz health-recorda na front endu za lekara ili medicinsku sestru
	@Query(value="select distinct count(a.*) from appointments a where a.doctor_id = ?1 and a.patient_id = ?2 and a.status = 'DONE' and deleted = false", nativeQuery=true)
	public Integer findDoneAppointmentForDoctorCount(Long doctor_id, Long patient_id);
	
	public DoctorPOJO findOneById(Long id);

}
