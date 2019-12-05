package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.repository.DiagnosisRepository;

@Service
public class DiagnosisService {

	@Autowired
	private DiagnosisRepository diagnosisRepository;
	
}
