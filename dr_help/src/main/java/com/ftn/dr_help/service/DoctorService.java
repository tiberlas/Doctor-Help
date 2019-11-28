package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.MedicalStuffProfileDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.adapter.ConcreteUserDetail;
import com.ftn.dr_help.model.adapter.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.validation.PasswordValidate;
import com.ftn.dr_help.validation.PasswordValidateInterface;
import com.ftn.dr_help.validation.ProfileValidation;
import com.ftn.dr_help.validation.ProfileValidationInterface;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository repository;
	
	public MedicalStuffProfileDTO findByEmail(String email) {
		if(email == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		
		if(finded == null) {
			return null;
		}
		
		return new MedicalStuffProfileDTO(finded);		
	}
	
	public DoctorPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO ret = repository.findById(id).orElse(null);
		
		return ret;
	}
	
	public MedicalStuffProfileDTO save(UserDetailDTO doctor, String email) {
		if(doctor == null) {
			return null;
		}
		
		DoctorPOJO current = repository.findOneByEmail(email);
		if(current == null)
			return null;
		
		ProfileValidationInterface validate = new ProfileValidation();
		ConcreteUserDetailInterface convertsToDoctor = new ConcreteUserDetail();
		
		if(validate.validUser(doctor)) {
			convertsToDoctor.changeTo(current, doctor);
			repository.save(current);
				
			return new MedicalStuffProfileDTO(current);
		}
	
		return null;
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		if(finded == null)
			return false;
		
		PasswordValidateInterface validate = new PasswordValidate();
		
		if(validate.isValid(password, finded.getPassword())) {
			String encoded = AppPasswordEncoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			repository.save(finded);
			return true;
		}
		
		return false;
	}
	
}
