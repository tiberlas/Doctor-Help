package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.NursePOJO;

@Repository()
public interface NurseRepository extends JpaRepository<NursePOJO, Long> {

	public NursePOJO findOneByEmail (String email);
	
}
