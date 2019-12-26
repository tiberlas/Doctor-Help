package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffSaveingDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.NurseRepository;
import com.ftn.dr_help.validation.PasswordValidate;

@Service
public class NurseService {

	@Autowired
	private NurseRepository repository;
	
	@Autowired
	private AppPasswordEncoder encoder;
	
	@Autowired
	private PasswordValidate passwordValidate;
	
	@Autowired
	private ConcreteUserDetailInterface convertor;
	
	@Autowired
	private ClinicAdministratorRepository administatorRepository;
	
	public MedicalStaffProfileDTO findByEmail(String email) {
		if(email == null) {
			return null;
		}
		
		NursePOJO finded = repository.findOneByEmail(email);
		
		if(finded == null) {
			return null;
		}
		
		return new MedicalStaffProfileDTO(finded);		
	}
	
	public NursePOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		NursePOJO ret = repository.findById(id).orElse(null);
		
		return ret;
	}
	
	public MedicalStaffProfileDTO save(UserDetailDTO nurse, String email) {
		if(nurse == null) {
			return null;
		}
		
		NursePOJO current = repository.findOneByEmail(email);
		if(current == null)
			return null;
		
		convertor.changeTo(current, nurse);
		repository.save(current);
				
		return new MedicalStaffProfileDTO(current);
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		NursePOJO finded = repository.findOneByEmail(email);
		if(finded == null)
			return false;
				
		if(passwordValidate.isValid(password, finded.getPassword())) {
			String encoded = encoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			repository.save(finded);
			return true;
		}
		
		return false;
	}
	
	public boolean save(MedicalStaffSaveingDTO newNurseDTO, String email) {
		try {
			ClinicAdministratorPOJO admin = administatorRepository.findOneByEmail(email);
			ClinicPOJO clinic = admin.getClinic();
			
			NursePOJO newNurse = new NursePOJO();
			newNurse.setFirstName(newNurseDTO.getFirstName());
			newNurse.setLastName(newNurseDTO.getLastName());
			newNurse.setEmail(newNurseDTO.getEmail());
			newNurse.setAddress("...");
			newNurse.setCity("...");
			newNurse.setState("...");
			newNurse.setPhoneNumber("...");
			newNurse.setClinic(clinic);
			newNurse.setMonday(newNurseDTO.getMonday());
			newNurse.setTuesday(newNurseDTO.getTuesday());
			newNurse.setWednesday(newNurseDTO.getWednesday());
			newNurse.setThursday(newNurseDTO.getThursday());
			newNurse.setFriday(newNurseDTO.getFriday());
			newNurse.setSaturday(newNurseDTO.getSaturday());
			newNurse.setSunday(newNurseDTO.getSunday());
			newNurse.setDeleted(false);
			
			String encoded = encoder.getEncoder().encode("DoctorHelp");
			newNurse.setPassword(encoded);
	
			repository.save(newNurse);
		} catch (Exception e) {
			return false;
		}
		
		return true;
	}
}
