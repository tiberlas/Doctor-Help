package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.MedicalStaffDTO;
import com.ftn.dr_help.dto.MedicalStaffFilterDTO;
import com.ftn.dr_help.model.enums.FilterMedicalStaffEnum;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.NurseRepository;

@Service
public class MedicalStuffService {

	@Autowired
	private NurseRepository nurseRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	public List<MedicalStaffDTO> findAll(Long clinic_id) {
		
		if(clinic_id == null) {
			return null;
		}
		
		List<MedicalStaffDTO> ret = new ArrayList<MedicalStaffDTO>();
		List<DoctorPOJO> findedDoctors = doctorRepository.findAllByClinic_id(clinic_id);
		List<NursePOJO> findedNurses = nurseRepository.findAllByClinic_id(clinic_id);
		
		if(findedDoctors != null) {
			for(DoctorPOJO doctor : findedDoctors) {
				//logic delete
				if(doctor.isDeleted()) {
					continue;
				}
				
				ret.add(new MedicalStaffDTO(doctor));
			}
		}
		
		if(findedNurses != null) {
			for(NursePOJO nurse : findedNurses) {
				//logic delete
				if(nurse.isDeleted()) {
					continue;
				}
				
				ret.add(new MedicalStaffDTO(nurse));
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public List<MedicalStaffDTO> findDoctors(Long clinicId) {
		if(clinicId == null) {
			return null;
		}
		
		List<MedicalStaffDTO> ret = new ArrayList<MedicalStaffDTO>();
		List<DoctorPOJO> findedDoctors = doctorRepository.findAllByClinic_id(clinicId);
		
		if(findedDoctors != null) {
			for(DoctorPOJO doctor : findedDoctors) {
				//logic delete
				if(doctor.isDeleted()) {
					continue;
				}
				
				ret.add(new MedicalStaffDTO(doctor));
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public List<MedicalStaffDTO> findNurses(Long clinicId) {
		if(clinicId == null) {
			return null;
		}
		
		List<MedicalStaffDTO> ret = new ArrayList<MedicalStaffDTO>();
		List<NursePOJO> findedNurses = nurseRepository.findAllByClinic_id(clinicId);
		
		if(findedNurses != null) {
			for(NursePOJO nurse : findedNurses) {
				//logic delete
				if(nurse.isDeleted()) {
					continue;
				}
				
				ret.add(new MedicalStaffDTO(nurse));
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public List<MedicalStaffDTO> filter(MedicalStaffFilterDTO filter, String email) {
		
		Long clinicId = adminRepository.findOneByEmail(email).getClinic().getId();
		try {
			
			if(filter.getRole() == FilterMedicalStaffEnum.DISABLED) {
				List<MedicalStaffDTO> list = findAll(clinicId);
				
				if(filter.getString().isEmpty()) {
					return list;
				} else {
					return searchFilter(list, filter.getString());
				}
			} else if(filter.getRole() == FilterMedicalStaffEnum.DOCTORS) {
				List<MedicalStaffDTO> list = findDoctors(clinicId);
				
				if(filter.getString().isEmpty()) {
					return list;
				} else {
					return searchFilter(list, filter.getString());
				}
			} else {
				List<MedicalStaffDTO> list = findNurses(clinicId);
				
				if(filter.getString().isEmpty()) {
					return list;
				} else {
					return searchFilter(list, filter.getString());
				}
			}
			
		} catch (Exception e) {
			return findAll(clinicId);
		}
	}

	private List<MedicalStaffDTO> searchFilter(List<MedicalStaffDTO> list, String filter) {
		List<MedicalStaffDTO> finded = new ArrayList<MedicalStaffDTO>();
		
		String search = "";
		for(MedicalStaffDTO staff : list) {
			search = staff.getFirstName().toLowerCase() + staff.getLastName().toLowerCase() + staff.getEmail().toLowerCase();
			
			if(search.contains(filter.toLowerCase())) {
				finded.add(staff);
			}
		}
		
		return finded;
	}

}
