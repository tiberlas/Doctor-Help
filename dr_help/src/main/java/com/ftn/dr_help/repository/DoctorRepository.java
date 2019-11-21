package com.ftn.dr_help.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorPOJO, Long> {
	
	List<DoctorPOJO> findAllByClinic_id(Long id);
	DoctorPOJO findOneByEmail (String email);

}