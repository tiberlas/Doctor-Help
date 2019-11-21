package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;


public interface ClinicAdministratorRepository extends JpaRepository<ClinicAdministratorPOJO, Long> {
	
	public ClinicAdminProfileDTO save(ClinicAdminProfileDTO entity);
	
	public ClinicAdministratorPOJO findOneByEmail (String email);

}
