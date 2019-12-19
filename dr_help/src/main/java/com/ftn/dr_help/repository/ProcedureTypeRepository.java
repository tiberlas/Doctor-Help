package com.ftn.dr_help.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;

@Repository
public interface ProcedureTypeRepository extends JpaRepository <ProceduresTypePOJO, Long>{ 

    Optional<ProceduresTypePOJO> findOneByName(String name);
    Optional<ProceduresTypePOJO> findByIdAndClinic_id(Long id, Long clinic_id);
}