package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.validation.PasswordValidate;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository repository;
	
	@Autowired
	private AppPasswordEncoder encoder;
	
	@Autowired
	private PasswordValidate passwordValidate;
	
	@Autowired
	private ConcreteUserDetailInterface convertor;
	
	public List<DoctorProfileDTO> findAll(Long clinicID) {
		if(clinicID == null) {
			return null;
		}
		
		List<DoctorPOJO> finded = repository.findAllByClinic_id(clinicID);
		if(finded == null)
			return null;
		
		List<DoctorProfileDTO> ret = new ArrayList<DoctorProfileDTO>();
		for(DoctorPOJO doctor : finded) {
			if(!doctor.isDeleted()) {
				ret.add(new DoctorProfileDTO(doctor));				
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public DoctorProfileDTO findOne(Long clinicID, Long doctorID) {
		if(clinicID == null || doctorID == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findById(doctorID).orElse(null);
		if(finded == null || finded.isDeleted() || !finded.getClinic().getId().equals(clinicID)) {
			return null;
		}
		
		return new DoctorProfileDTO(finded);
	}
	
	public MedicalStaffProfileDTO findByEmail(String email) {
		if(email == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		
		if(finded == null) {
			return null;
		}
		
		return new MedicalStaffProfileDTO(finded);		
	}
	
	public DoctorPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO ret = repository.findById(id).orElse(null);
		
		return ret;
	}
	
	public MedicalStaffProfileDTO save(UserDetailDTO doctor, String email) {
		if(doctor == null) {
			return null;
		}
		
		DoctorPOJO current = repository.findOneByEmail(email);
		if(current == null)
			return null;
		
		//ProfileValidationInterface validate = new ProfileValidation();
		//ConcreteUserDetailInterface convertsToDoctor = new ConcreteUserDetail();
		
		convertor.changeTo(current, doctor);
		repository.save(current);
				
		return new MedicalStaffProfileDTO(current);
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
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
	
}
