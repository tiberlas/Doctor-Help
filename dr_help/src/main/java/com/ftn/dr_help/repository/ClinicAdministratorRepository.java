package com.ftn.dr_help.repository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;

@Repository("clinicAdminPostgre")
public interface ClinicAdministratorRepository extends JpaRepository<ClinicAdministratorPOJO, Long> {
	
	public ClinicAdminProfileDTO save(ClinicAdminProfileDTO entity);
	
	//public ClinicAdministratorPOJO findOneByEmail (String email);

}
