package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.NursePOJO;

@Repository("NurseRepository")
public interface NurseRepository extends JpaRepository<NursePOJO, Long>{
	
	List<NursePOJO> findAllByClinic_id(Long id);

}
