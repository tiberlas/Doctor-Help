package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ftn.dr_help.model.pojo.PerscriptionPOJO;

public interface PerscriptionRepository extends JpaRepository<PerscriptionPOJO, Long>{
	
	
	//List<PerscriptionPOJO> findNursePerscriptions(Long nurseId);
	
	@Query("select p from PerscriptionPOJO p where p.signingNurse is null")
	public List<PerscriptionPOJO> findAllPendingPerscriptions();
	
	public PerscriptionPOJO findOneById(Long id);
	
}
