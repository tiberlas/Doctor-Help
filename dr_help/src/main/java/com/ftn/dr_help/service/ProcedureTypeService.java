package com.ftn.dr_help.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.repository.ProcedureTypeRepository;

@Service
public class ProcedureTypeService {

	@Autowired
	private ProcedureTypeRepository procedureTypeRepository;
	
	
	public List<String> getProcedureTypes () {
		return procedureTypeRepository.getProcedureTypes();
	}
	
	public double getPrice (Long clinicId, String procedureName) {
		return procedureTypeRepository.getPrice(clinicId, procedureName);
	}
	
}
