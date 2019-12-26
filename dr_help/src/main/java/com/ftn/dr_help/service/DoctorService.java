package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.comon.EmailCheck;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorListingDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.DoctorProfilePreviewDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffSaveingDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
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
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private EmailCheck check;
	
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
				//logic delete
				if(doctor.isDeleted()) {
					continue;
				}
				
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
		
		//logic delete
		if(finded.isDeleted()) {
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
		
		//logic delete
		if(finded.isDeleted()) {
			return null;
		}
		
		return new MedicalStaffProfileDTO(finded);		
	}
	
	public DoctorPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO ret = repository.findById(id).orElse(null);
		
		//logic delete
		if(ret.isDeleted()) {
			return null;
		}
		
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
		//logic delete
		if(current.isDeleted()) {
			return null;
		}
		
		
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
		
		//logic delete
		if(finded.isDeleted()) {
			return false;
		}
		
		if(passwordValidate.isValid(password, finded.getPassword())) {
			String encoded = encoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			repository.save(finded);
			return true;
		}
		
		return false;
	}
	
	public List<DoctorListingDTO> filterByClinicAndProcedureType (Long clinicId, String procedureType) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.filterByClinicAndProcedureType(clinicId, procedureType);
		for (DoctorPOJO d : doctors) {
			System.out.println("For petlja u filteru po oba");
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> getAllUnfiltered () {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors = repository.findAll();
		for (DoctorPOJO d : doctors) {
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> filterByClinic (Long clinicId) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.findAllByClinic_id(clinicId);
		for (DoctorPOJO d : doctors) {
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add(new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public DoctorProfilePreviewDTO getProfilePreview (Long id) {
		DoctorPOJO doctor = repository.getOne(id);
		if (doctor == null) {
			return null;
		}
		//logic delete
		if(doctor.isDeleted()) {
			return null;
		}
		
		DoctorProfilePreviewDTO retVal = new DoctorProfilePreviewDTO (doctor);
		return retVal;
	}
	
	public boolean save(MedicalStaffSaveingDTO newDoctorDTO, String email) {
		try {
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			ClinicPOJO clinic = admin.getClinic();
			
			if(!check.checkIfValid(newDoctorDTO.getEmail())) {
				return false;
			}
			
			DoctorPOJO newDoctor = new DoctorPOJO();
			newDoctor.setFirstName(newDoctorDTO.getFirstName());
			newDoctor.setLastName(newDoctorDTO.getLastName());
			newDoctor.setEmail(newDoctorDTO.getEmail());
			newDoctor.setAddress("...");
			newDoctor.setCity("...");
			newDoctor.setState("...");
			newDoctor.setPhoneNumber("...");
			Calendar birthday = Calendar.getInstance();
			newDoctor.setBirthday(birthday);
			newDoctor.setClinic(clinic);
			newDoctor.setMonday(newDoctorDTO.getMonday());
			newDoctor.setTuesday(newDoctorDTO.getTuesday());
			newDoctor.setWednesday(newDoctorDTO.getWednesday());
			newDoctor.setThursday(newDoctorDTO.getThursday());
			newDoctor.setFriday(newDoctorDTO.getFriday());
			newDoctor.setSaturday(newDoctorDTO.getSaturday());
			newDoctor.setSunday(newDoctorDTO.getSunday());
			newDoctor.setDeleted(false);
			
			String encoded = encoder.getEncoder().encode("DoctorHelp");
			newDoctor.setPassword(encoded);
	
			repository.save(newDoctor);
		} catch (Exception e) {
			return false;
		}
		
		return true;
	}
	
	public boolean delete(Long id) {
		try {
			
			DoctorPOJO doctor = repository.findById(id).orElse(null);
			
			doctor.setDeleted(true);
			repository.save(doctor);
			
		} catch(Exception e) {
			return false;
		}
		
		return true;
	}
	
}
