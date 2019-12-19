package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.PatientPOJO;

@Repository
public interface ProcedureTypeRepository extends JpaRepository<PatientPOJO, Long>{

	@Query (value = "select distinct pt.name from procedures_type pt inner join doctors d on pt.id = d.procedure_type_id", nativeQuery = true)
	public List<String> getProcedureTypes ();
}
