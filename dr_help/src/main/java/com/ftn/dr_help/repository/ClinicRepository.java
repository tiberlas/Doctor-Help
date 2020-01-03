package com.ftn.dr_help.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.ClinicPOJO;

@Repository
public interface ClinicRepository extends JpaRepository<ClinicPOJO, Long>{

	public ClinicPOJO findByName(String name);
	
	@Query (value="select distinct c.* from (clinic c inner join doctors d on c.id = d.clinic_id) inner join procedures_type pt on d.procedure_type_id = pt.id where pt.\"name\" = ?1", nativeQuery = true)
	public List<ClinicPOJO> getClinicsByProcedureType (String procedureType);
	
	@Query (value = "select distinct c.* from ((doctors d inner join procedures_type pt on d.procedure_type_id = pt.id) inner join appointments a on a.doctor_id = d.id) inner join clinic c on d.clinic_id = c.id where pt.\"name\" = ?1 and a.\"date\" between ?2 and ?3", nativeQuery = true)
	public List<ClinicPOJO> filterByAppointmentDateAndType (String procedureType, Date dateMin, Date dateMax);
	
}
 