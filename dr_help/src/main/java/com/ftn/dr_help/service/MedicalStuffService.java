package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.MedicalStaffDTO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.NurseRepository;

@Service
public class MedicalStuffService {

	@Autowired
	private NurseRepository nurseRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;

	public List<MedicalStaffDTO> findAll(Long clinic_id) {
		
		if(clinic_id == null) {
			return null;
		}
		
		List<MedicalStaffDTO> ret = new ArrayList<MedicalStaffDTO>();
		List<DoctorPOJO> findedDoctors = doctorRepository.findAllByClinic_id(clinic_id);
		List<NursePOJO> findedNurses = nurseRepository.findAllByClinic_id(clinic_id);
		
		if(findedDoctors != null) {
			for(DoctorPOJO doctor : findedDoctors) {
				ret.add(new MedicalStaffDTO(doctor));
			}
		}
		
		if(findedNurses != null) {
			for(NursePOJO nurse : findedNurses) {
				ret.add(new MedicalStaffDTO(nurse));
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
}
