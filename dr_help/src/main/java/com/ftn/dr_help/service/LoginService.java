package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.LoginResponseDTO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.repository.PatientRepository;

@Service
public class LoginService {

	@Autowired
	private PatientRepository patientRepository;

	public LoginResponseDTO getLoginResponse (String email) {
		System.out.println("Login servis pokrenut");
		PatientPOJO temp = patientRepository.findOneByEmail (email);
		
		LoginResponseDTO retVal = new LoginResponseDTO ();
		
		if (temp == null) {
			System.out.println("Nisam ucitao iz baze");
			return null;
		}
		
		retVal.setId (temp.getId ());
		retVal.setUserRole (temp.getRole ());
		
		System.out.println("Id: " + retVal.getId());
		System.out.println("Role: " + retVal.getUserRole());
		
		return retVal;
	}
	
}
