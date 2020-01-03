package com.ftn.dr_help.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;

@Repository
public interface ProcedureTypeRepository extends JpaRepository<ProceduresTypePOJO, Long>{

	@Query (value = "select distinct pt.name from procedures_type pt inner join doctors d on pt.id = d.procedure_type_id", nativeQuery = true)
	public List<String> getProcedureTypes ();
	
	@Query (value = "select price from procedures_type pt where clinic_id = ?1 and name = ?2", nativeQuery = true)
	public Double getPrice (Long clinicId, String procedureName);
	
	Optional<ProceduresTypePOJO> findOneByName(String name);
    Optional<ProceduresTypePOJO> findByIdAndClinic_id(Long id, Long clinic_id);
	
       
}
