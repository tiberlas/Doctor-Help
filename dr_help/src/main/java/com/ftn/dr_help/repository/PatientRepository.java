package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.PatientPOJO;

@Repository("patientRepository")
public interface PatientRepository extends JpaRepository<PatientPOJO, Long> {

	public PatientPOJO save(PatientPOJO patient);
	
	public PatientPOJO findByEmail(String email);
}
