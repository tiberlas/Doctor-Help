package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.CentreAdministratorRepository;
import com.ftn.dr_help.validation.PasswordValidate;
import com.ftn.dr_help.validation.PasswordValidateInterface;

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
	
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		CentreAdministratorPOJO c = administratorRepository.findOneByEmail(email);
		if(c == null)
			return false;
		
		PasswordValidateInterface validate = new PasswordValidate();
		
		if(validate.isValid(password, c.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(password.getNewPassword());
			c.setPassword(encoded);
			administratorRepository.save(c);
			return true;
		}
		
		return false;
	}
	

}
