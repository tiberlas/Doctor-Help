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
//	
//	@Query(value = "select distinct h.* from appointments a inner join patiens p on a.patient_id = p.id inner join healthrecord h on p.health_record_id = h.id where a.id = ?1", nativeQuery = true)
//	public HealthRecordPOJO findPatientHealthRecord(Long id);
	
}
