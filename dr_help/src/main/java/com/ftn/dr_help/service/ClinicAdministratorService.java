package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ClinicAdminNameDTO;
import com.ftn.dr_help.dto.ClinicAdminProfileDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;

@Service
public class ClinicAdministratorService {

	@Autowired
	@Qualifier("clinicAdminPostgre")
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
		//treba validacija
		if(admin.getFirstName() != null && admin.getFirstName() != "")
			current.setFirstName(admin.getFirstName());
		
		if(admin.getLastName() != null && admin.getLastName() != "")
			current.setLastName(admin.getLastName());
		
		if(admin.getEmail() != null && admin.getEmail() != "")
			current.setEmail(admin.getEmail());
		
		if(admin.getPhoneNumber() != null && admin.getPhoneNumber() != "")
			current.setPhoneNumber(admin.getPhoneNumber());
		
		if(admin.getCity() != null && admin.getCity() != "")
			current.setCity(admin.getCity());
		
		if(admin.getState() != null && admin.getState() != "")
			current.setState(admin.getState());
		
		if(admin.getAddress() != null && admin.getAddress() != "")
			current.setAddress(admin.getAddress());
		
		if(admin.getBirthday() != null)
			current.setBirthday(admin.getBirthday());
		
		//ClinicAdministratorPOJO krstio = new ClinicAdministratorPOJO();
		//krstio.setFirstName(admin.getFirstName());
		clinicAdministratorRepository.save(current);
	
		return new ClinicAdminProfileDTO(current);
	}

	public void remove(Long id) {
		clinicAdministratorRepository.deleteById(id);
	}
	
	public ClinicAdministratorPOJO save(ClinicAdministratorPOJO admin) {
		return clinicAdministratorRepository.save(admin);
	}
	

}
