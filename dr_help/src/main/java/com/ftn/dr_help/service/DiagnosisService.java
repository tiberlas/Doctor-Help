package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.pojo.DiagnosisPOJO;
import com.ftn.dr_help.repository.DiagnosisRepository;

@Service
public class DiagnosisService {

	@Autowired
	private DiagnosisRepository diagnosisRepository;
	
	
	public List<DiagnosisPOJO> findAll() {
		return diagnosisRepository.findAll();
	}
	
	
	public DiagnosisPOJO save(DiagnosisPOJO diag) {
		return diagnosisRepository.save(diag); 
	}

	
	
}