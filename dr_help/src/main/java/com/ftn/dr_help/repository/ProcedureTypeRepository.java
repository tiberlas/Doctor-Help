package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.PatientPOJO;

@Repository
public interface ProcedureTypeRepository extends JpaRepository<PatientPOJO, Long>{
	
	@Query (value = "SELECT DISTINCT name FROM procedures_type", nativeQuery=true)
	public List<String> getProcedureTypes ();
	
}
