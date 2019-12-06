package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.CentreAdminProfileDTO;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.repository.CentreAdministratorRepository;
import com.ftn.dr_help.validation.PasswordValidate;


@Service
public class CentreAdministratorService {
	
	@Autowired
	private CentreAdministratorRepository administratorRepository;
	
	@Autowired
	private AppPasswordEncoder encoder;
	
	@Autowired
	private PasswordValidate passwordValidate;
	
	@Autowired
	private ConcreteUserDetailInterface convertor;
	

	public CentreAdministratorPOJO findOneByEmail(String email) {
		return administratorRepository.findOneByEmail(email);
	}
	
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
	
	public CentreAdminProfileDTO save(UserDetailDTO admin, String email) {
		if(admin == null) {
			return null;
		}
		CentreAdministratorPOJO current = administratorRepository.findOneByEmail(email);
		
		if(current == null)
			return null;
		
		//ProfileValidationInterface validate = new ProfileValidation();
		//ConcreteUserDetailInterface convertsToAdmin = new ConcreteUserDetail();
		
		convertor.changeTo(current, admin);
		administratorRepository.save(current);
				
		return new CentreAdminProfileDTO(current);
	}
	
	
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		CentreAdministratorPOJO c = administratorRepository.findOneByEmail(email);
		if(c == null)
			return false;
		
		if(passwordValidate.isValid(password, c.getPassword())) {
			String encoded = encoder.getEncoder().encode(password.getNewPassword());
			c.setPassword(encoded);
			c.setMustChangePassword(false);
			administratorRepository.save(c);
			return true;
		}
		
		return false;
	}
	

}
