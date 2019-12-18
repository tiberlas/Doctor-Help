package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import com.ftn.dr_help.dto.ProcedureTypeDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcedureTypeService {

    @Autowired
    private ProcedureTypeRepository repository;

    @Autowired
    private ClinicAdministratorRepository adminRepository;

    public List<ProcedureTypeDTO> getAll() {
        List<ProceduresTypePOJO> finded = repository.findAll();
        List<ProcedureTypeDTO> ret = new ArrayList<>();

        for(ProceduresTypePOJO pojo : finded) {
            ret.add(new ProcedureTypeDTO(pojo));
        }

        return ret;
    }

    public ProcedureTypeDTO getOne(Long id) {
        ProceduresTypePOJO finded = repository.findById(id).orElse(null);

        if(finded == null) {
            return null;
        }

        ProcedureTypeDTO ret = new ProcedureTypeDTO(finded);
        return ret;
    }

    public ProcedureTypeDTO saveNew(ProcedureTypeDTO newProcedure, String email) {
        if(email == null) {
			return null;
		}
		
		if(newProcedure == null) {
			return null;
		}
		
		ProceduresTypePOJO exist = repository.findOneByName(newProcedure.getName()).orElse(null);
		if(exist != null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO clinic = admin.getClinic();
        ProceduresTypePOJO procedure = new ProceduresTypePOJO();
        procedure.setClinic(clinic);
        procedure.setPrice(newProcedure.getPrice());
        procedure.setName(newProcedure.getName());
        procedure.setDuration(newProcedure.getDuration());
        procedure.setOperation(newProcedure.isOperation());
		
		repository.save(procedure);
		
		return new ProcedureTypeDTO(procedure);
    }
}