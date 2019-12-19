package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.ProcedureTypeDTO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;

@Service
public class ProcedureTypeService {

    @Autowired
    private ProcedureTypeRepository repository;

    @Autowired
    private ClinicAdministratorRepository adminRepository;

    public List<ProcedureTypeDTO> getAll(String email) {
    	ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
    	if( admin == null) {
    		return null;
    	}
    	
    	ClinicPOJO clinic = admin.getClinic();
    	if(clinic == null) {
    		return null;
    	}
    	
    	List<ProceduresTypePOJO> finded = clinic.getProcedureTypesList();
    	List<ProcedureTypeDTO> ret = new ArrayList<>();    	

        for(ProceduresTypePOJO pojo : finded) {
        	if(pojo.isDeleted() == false) {
        		ret.add(new ProcedureTypeDTO(pojo));
        	}
        }

        return ret;
    }

    public ProcedureTypeDTO getOne(Long id, String email) {
    	ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
    	if( admin == null) {
    		return null;
    	}
    	
    	ClinicPOJO clinic = admin.getClinic();
    	if(clinic == null) {
    		return null;
    	}
    	
        ProceduresTypePOJO finded = repository.findById(id).orElse(null);

        if(finded == null || !finded.getClinic().equals(clinic) || finded.isDeleted()==true) {
            return null;
        }

        ProcedureTypeDTO ret = new ProcedureTypeDTO(finded);
        return ret;
    }

    public ProcedureTypeDTO save(ProcedureTypeDTO newProcedure, String email) {
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
        procedure.setDeleted(false);
		
		repository.save(procedure);
		
		return new ProcedureTypeDTO(procedure);
    }
    
    public void delete(Long id, String email) {
		
		if(id == null) {
			return;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return;
		}
		
		ClinicPOJO clinic = admin.getClinic();
		List<ProceduresTypePOJO> findedList = clinic.getProcedureTypesList();
		if(findedList == null || findedList.isEmpty()) {
			return;
		}
		
		ProceduresTypePOJO finded = null;
		for(ProceduresTypePOJO pojo : findedList) {
			if(pojo.getId().equals(id)) {
				finded = pojo;
				break;
			}
		}
		
		if(finded == null) {
			return;
		}
		finded.setDeleted(true);
		repository.save(finded);
	}
	
	public ProcedureTypeDTO change(ProcedureTypeDTO procedure, String email) {
		
		if(procedure == null || procedure.getId() == null) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO clinic = admin.getClinic();
		List<ProceduresTypePOJO> findedList = clinic.getProcedureTypesList();
		if(findedList == null || findedList.isEmpty()) {
			return null;
		}
		
		ProceduresTypePOJO finded = null;
		for(ProceduresTypePOJO pojo : findedList) {
			if(pojo.getId().equals(procedure.getId())) {
				finded = pojo;
				break;
			}
		}
		
		if(finded == null) {
			return null;
		}
		
		if(!finded.getName().equals(procedure.getName())) {
			ProceduresTypePOJO exist = repository.findOneByName(procedure.getName()).orElse(null);
			if(exist != null) {
				return null;
			}
		}
		
		System.out.println("duration is" + procedure.getDuration());
		finded.setPrice(procedure.getPrice());
		finded.setName(procedure.getName());
		finded.setDuration(procedure.getDuration());
		finded.setOperation(procedure.isOperation());
		finded.setDeleted(false);
		
		repository.save(finded);
		
		return new ProcedureTypeDTO(finded);
	}
}