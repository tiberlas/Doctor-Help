package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.OperationPOJO;

@Repository
public interface OperationRepository extends JpaRepository<OperationPOJO, Long> {

	OperationPOJO findOneById(Long id);
	
	@Query(value = "select o.* from operations o inner join doctors d on (d.id = o.requested_doctor_id) where o.deleted = false and d.email= ?1 and o.status <> 'DONE'", nativeQuery = true)
	public List<OperationPOJO> getAllOperationRequests(String email);
	
}
