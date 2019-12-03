package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetail;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.validation.PasswordValidate;
import com.ftn.dr_help.validation.PasswordValidateInterface;
import com.ftn.dr_help.validation.ProfileValidation;
import com.ftn.dr_help.validation.ProfileValidationInterface;

@Service
public class ClinicAdministratorService {
	
	@Autowired
	private ClinicAdministratorRepository clinicAdministratorRepository;
	
	public ClinicAdministratorPOJO findOne(Long id) {
		return clinicAdministratorRepository.findById(id).orElseGet(null);
	}
	
	public ClinicAdminProfileDTO findOneProfile(String email) {
		if(email == null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = clinicAdministratorRepository.findOneByEmail(email);
		
		if(admin == null)
			return null;
		
		return new ClinicAdminProfileDTO(admin);
	}

	public ClinicAdminNameDTO findOnesName(String email) {
		if(email == null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = clinicAdministratorRepository.findOneByEmail(email);
		ClinicAdminNameDTO ret;
		
		if(admin == null)
			ret = null;
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

	public ClinicAdminProfileDTO save(UserDetailDTO admin, String email) {
		if(admin == null) {
			return null;
		}
		ClinicAdministratorPOJO current = clinicAdministratorRepository.findOneByEmail(email);
		
		if(current == null)
			return null;
		
		ProfileValidationInterface validate = new ProfileValidation();
		ConcreteUserDetailInterface convertsToAdmin = new ConcreteUserDetail();
		
		if(validate.validUser(admin)) {
			convertsToAdmin.changeTo(current, admin);
			clinicAdministratorRepository.save(current);
				
			return new ClinicAdminProfileDTO(current);
		}
	
		return null;
	}

	public void remove(Long id) {
		if(id == null) {
			return;
		}
		
		clinicAdministratorRepository.deleteById(id);
	}
	
	public ClinicAdministratorPOJO save(ClinicAdministratorPOJO admin) {
		if(admin == null) {
			return null;
		}
		
		return clinicAdministratorRepository.save(admin);
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		ClinicAdministratorPOJO finded = clinicAdministratorRepository.findOneByEmail(email);
		if(finded == null)
			return false;
		
		PasswordValidateInterface validate = new PasswordValidate();
		
		if(validate.isValid(password, finded.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			clinicAdministratorRepository.save(finded);
			return true;
		}
		
		return false;
	}
	
}
