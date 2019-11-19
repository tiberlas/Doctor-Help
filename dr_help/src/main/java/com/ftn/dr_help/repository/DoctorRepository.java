package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorPOJO, Long>{
	
	DoctorPOJO findOneByEmail (String email);
	
}
