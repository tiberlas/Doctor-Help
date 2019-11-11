package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.repository.CentreAdministratorRepository;

@Service
public class CentreAdministratorService {
	
	@Autowired
	private CentreAdministratorRepository administratorRepository;

	public CentreAdministratorPOJO findOne(Long id) {
		return administratorRepository.findById(id).orElseGet(null);
	}

	public List<CentreAdministratorPOJO> findAll() {
		return administratorRepository.findAll();
	}

	public CentreAdministratorPOJO save(CentreAdministratorPOJO centerAdministrator) {
		return administratorRepository.save(centerAdministrator);
	}

	public void remove(Long id) {
		administratorRepository.deleteById(id);
	}

}