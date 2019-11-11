package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.model.pojo.MedicationPOJO;

public interface MedicationRepository extends JpaRepository<MedicationPOJO, Long>{
	
}
