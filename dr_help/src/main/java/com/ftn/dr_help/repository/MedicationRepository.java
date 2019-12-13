package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.MedicationPOJO;

@Repository
public interface MedicationRepository extends JpaRepository<MedicationPOJO, Long>{
	
	public MedicationPOJO findByMedicationName(String name);
}
