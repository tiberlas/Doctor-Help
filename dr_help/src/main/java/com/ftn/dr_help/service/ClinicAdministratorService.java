package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;

@Service
public class ClinicAdministratorService {

	@Autowired
	@Qualifier("InMemoryClinicAdmin")
	private ClinicAdministratorRepository clinicAdministratorRepository;
	
	public ClinicAdministratorPOJO findOne(Long id) {
		return clinicAdministratorRepository.findById(id).orElseGet(null);
	}

	public ClinicAdminNameDTO findOnesName(Long id) {
		ClinicAdministratorPOJO admin = clinicAdministratorRepository.getOne(id);
		ClinicAdminNameDTO ret;
		
		if(admin == null)
			ret = new ClinicAdminNameDTO("", "");
		else
			ret = new ClinicAdminNameDTO(admin);
		
		return ret;
	}
	
	public List<ClinicAdministratorPOJO> findAll() {
		return clinicAdministratorRepository.findAll();
	}
	
	public Page<ClinicAdministratorPOJO> findAll(Pageable page) {
		return clinicAdministratorRepository.findAll(page);
	}

	public ClinicAdministratorPOJO save(ClinicAdministratorPOJO admin) {
		return clinicAdministratorRepository.save(admin);
	}

	public void remove(Long id) {
		clinicAdministratorRepository.deleteById(id);
	}
}
