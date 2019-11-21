package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.model.pojo.ClinicPOJO;

public interface ClinicRepository extends JpaRepository<ClinicPOJO, Long>{

}
