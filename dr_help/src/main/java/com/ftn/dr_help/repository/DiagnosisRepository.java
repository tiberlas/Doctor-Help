package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.DiagnosisPOJO;

@Repository
public interface DiagnosisRepository extends JpaRepository<DiagnosisPOJO, Long> {

}
