package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.OperationPOJO;

@Repository
public interface OperationRepository extends JpaRepository<OperationPOJO, Long> {

	OperationPOJO findOneById(Long id);
	
}
