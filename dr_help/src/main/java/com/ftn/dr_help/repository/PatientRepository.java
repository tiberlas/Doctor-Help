package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.model.pojo.PatientPOJO;

public interface PatientRepository extends JpaRepository<PatientPOJO, Long>{

}