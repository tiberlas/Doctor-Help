package com.ftn.dr_help.reposirory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;

@Repository
public interface CenterAdministratorRepository extends JpaRepository<CentreAdministratorPOJO, Long>{

}
