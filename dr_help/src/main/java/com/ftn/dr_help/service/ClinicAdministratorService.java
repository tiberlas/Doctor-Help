package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.validation.ProfileValidation;
import com.ftn.dr_help.validation.ProfileValidationInterface;

@Service
public class ClinicAdministratorService {
	
	@Autowired
	private ClinicAdministratorRepository clinicAdministratorRepository;
	
	public ClinicAdministratorPOJO findOne(Long id) {
		return clinicAdministratorRepository.findById(id).orElseGet(null);
	}
	
	public ClinicAdminProfileDTO findOneProfile(Long id) {
		ClinicAdministratorPOJO admin = clinicAdministratorRepository.getOne(id);
		
		if(admin == null)
			return null;
		
		return new ClinicAdminProfileDTO(admin);
	}

	public ClinicAdminNameDTO findOnesName(Long id) {
		ClinicAdministratorPOJO admin = clinicAdministratorRepository.getOne(id);
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

	public ClinicAdminProfileDTO save(ClinicAdminProfileDTO admin) {
		ClinicAdministratorPOJO current = findOne(admin.getId());
		
		if(current == null)
			return new ClinicAdminProfileDTO();
		
		ProfileValidationInterface validate = new ProfileValidation();
		
		if(validate.isValidName(admin.getFirstName()))
			current.setFirstName(admin.getFirstName());
		
		if(validate.isValidName(admin.getLastName()))
			current.setLastName(admin.getLastName());
		
		if(validate.isValidEmail(admin.getEmail()))
			current.setEmail(admin.getEmail());
		
		if(validate.isValidPhoneNumber(admin.getPhoneNumber()))
			current.setPhoneNumber(admin.getPhoneNumber());
		
		if(validate.isValidPlace(admin.getCity()))
			current.setCity(admin.getCity());
		
		if(validate.isValidPlace(admin.getState()))
			current.setState(admin.getState());
		
		if(validate.isValidPlace(admin.getAddress()))
			current.setAddress(admin.getAddress());
		
		if(validate.isValidDate(admin.getBirthday()))
			current.setBirthday(admin.getBirthday());
		
		clinicAdministratorRepository.save(current);
	
		return new ClinicAdminProfileDTO(current);
	}

	public void remove(Long id) {
		clinicAdministratorRepository.deleteById(id);
	}
	
	public ClinicAdministratorPOJO save(ClinicAdministratorPOJO admin) {
		return clinicAdministratorRepository.save(admin);
	}
	
	public boolean changePassword(ChangePasswordDTO password) {
		ClinicAdministratorPOJO finded = clinicAdministratorRepository.findById(password.getId()).orElseGet(null);
		
		if(finded == null)
			return false;
		
		if(finded.getPassword().equals(password.getOldPassword())) {
			finded.setPassword(password.getNewPassword());
			clinicAdministratorRepository.save(finded);
			return true;
		}
		
		return false;
	}
	
}
