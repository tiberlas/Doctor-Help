package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.repository.CentreAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.PatientRepository;

@Service
public class LoginService {

	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private CentreAdministratorRepository centreAdminstratorRepository;
	
	public PatientPOJO getPatientLoginResponse (String email) {
		PatientPOJO retVal = patientRepository.findOneByEmail (email);
		return retVal;
	}
	
	public DoctorPOJO getDoctorLoginResponse (String email) {
		DoctorPOJO retVal = doctorRepository.findOneByEmail(email);
		return retVal;
	}
	
	public CentreAdministratorPOJO getCentreAdministratorLoginResponse (String email) {
		CentreAdministratorPOJO retVal = centreAdminstratorRepository.findOneByEmail (email);
		return retVal;
	}
	
}
