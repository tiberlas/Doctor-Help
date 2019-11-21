package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.MedicalStuffDTO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.NurseRepository;

@Service
public class MedicalStuffService {

	@Autowired
	@Qualifier("NurseRepository")
	private NurseRepository nurseRepository;
	
	@Autowired
	@Qualifier("DoctorRepository")
	private DoctorRepository doctorRepository;

	public List<MedicalStuffDTO> findAll(Long clinic_id) {
		
		List<MedicalStuffDTO> ret = new ArrayList<MedicalStuffDTO>();
		List<DoctorPOJO> findedDoctors = doctorRepository.findAllByClinic_id(clinic_id);
		List<NursePOJO> findedNurses = nurseRepository.findAllByClinic_id(clinic_id);
		
		if(findedDoctors != null) {
			for(DoctorPOJO doctor : findedDoctors) {
				ret.add(new MedicalStuffDTO(doctor));
			}
		}
		
		if(findedNurses != null) {
			for(NursePOJO nurse : findedNurses) {
				ret.add(new MedicalStuffDTO(nurse));
			}
		}
		
		return ret;
	}
}
