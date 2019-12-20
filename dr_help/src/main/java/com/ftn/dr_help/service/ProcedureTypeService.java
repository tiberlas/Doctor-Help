package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ftn.dr_help.dto.ProcedureTypeDTO;
import com.ftn.dr_help.dto.ProcedureTypeFilterDTO;
import com.ftn.dr_help.model.enums.FilterOperationEnum;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;

@Service
public class ProcedureTypeService {

	@Autowired
	private ProcedureTypeRepository procedureTypeRepository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	
	public List<String> getProcedureTypes () {
		return procedureTypeRepository.getProcedureTypes();
	}
	
	public double getPrice (Long clinicId, String procedureName) {
		return procedureTypeRepository.getPrice(clinicId, procedureName);
	}
	
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

    public ProcedureTypeDTO getOne(Long id) {
    	if( id == null) {
    		return null;
    	}
    	
        ProceduresTypePOJO finded = procedureTypeRepository.findById(id).orElse(null);

        ProcedureTypeDTO ret = new ProcedureTypeDTO(finded);
        return ret;
    }

    public ProcedureTypeDTO save(ProcedureTypeDTO newProcedure, String email) {
		if(newProcedure == null) {
			return null;
		}
		
		ProceduresTypePOJO exist = procedureTypeRepository.findOneByName(newProcedure.getName()).orElse(null);
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
		
        procedureTypeRepository.save(procedure);
		
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
		procedureTypeRepository.save(finded);
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
			ProceduresTypePOJO exist = procedureTypeRepository.findOneByName(procedure.getName()).orElse(null);
			if(exist != null) {
				return null;
			}
		}
		
		finded.setPrice(procedure.getPrice());
		finded.setName(procedure.getName());
		finded.setDuration(procedure.getDuration());
		finded.setOperation(procedure.isOperation());
		finded.setDeleted(false);
		
		procedureTypeRepository.save(finded);
		
		return new ProcedureTypeDTO(finded);
	}
	
	public List<ProcedureTypeDTO> filter (ProcedureTypeFilterDTO filter, String email) {
		
		List<ProcedureTypeDTO> finded = getAll(email);
		if(filter.getString().isEmpty()) {
			if(filter.getOperation() == FilterOperationEnum.NOT_DEFINED) {
				return finded;				
			} else if(filter.getOperation() == FilterOperationEnum.OPERATION) {
				return operationsOrNot(finded, true);
			} else {
				return operationsOrNot(finded, false);
			}
		}
		
		List<ProcedureTypeDTO> ret = new ArrayList<ProcedureTypeDTO>();
		String search = "";
		for(ProcedureTypeDTO item : finded) {
			search = item.getName().toLowerCase() + String.valueOf(item.getPrice()) + String.valueOf(item.getDuration());
			System.out.println(search);
			if(search.contains(filter.getString().toLowerCase())) {
				ret.add(item);			
			}
		}
		
		if(ret.isEmpty()) {
			return ret;
		}
		
		if(filter.getOperation() == FilterOperationEnum.NOT_DEFINED) {
			return ret;				
		} else if(filter.getOperation() == FilterOperationEnum.OPERATION) {
			return operationsOrNot(ret, true);
		} else {
			return operationsOrNot(ret, false);
		}
	}
	
	private List<ProcedureTypeDTO> operationsOrNot(List<ProcedureTypeDTO> procedures, boolean isOperation) {
		List<ProcedureTypeDTO> ret = new ArrayList<>();
		
		for(ProcedureTypeDTO procedure : procedures) {
			if(procedure.isOperation() == isOperation) {
				ret.add(procedure);
			}
		}
		
		return ret;
	}
}
