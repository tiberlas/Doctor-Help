package com.ftn.dr_help.dto;

import java.util.ArrayList;
import java.util.List;

public class ClinicListingDTO {

	

	private List<ClinicDTO> clinicList;
	private List<String> procedureType;
	
	public ClinicListingDTO () {
		clinicList = new ArrayList<ClinicDTO> ();
		procedureType = new ArrayList<String> ();
	}
	
	public ClinicListingDTO(List<ClinicDTO> clinicList, List<String> procedureType) {
		super();
		this.clinicList = clinicList;
		this.procedureType = procedureType;
	}

	public List<ClinicDTO> getClinicList() {
		return clinicList;
	}

	public void setClinicList(List<ClinicDTO> clinicList) {
		this.clinicList = clinicList;
	}

	public List<String> getProcedureType() {
		return procedureType;
	}

	public void setProcedureType(List<String> procedureType) {
		this.procedureType = procedureType;
	}
	
	
	
}
