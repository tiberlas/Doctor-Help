package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;

@Repository
public interface ProcedureTypeRepository extends JpaRepository <ProceduresTypePOJO, Long>{ 

    Optional<ProceduresTypePOJO> findOneByName(String name);
}