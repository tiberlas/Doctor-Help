package com.ftn.dr_help.dto;

import java.util.ArrayList;
import java.util.List;

public class ClinicListingDTO {

	

	private List<ClinicPreviewDTO> clinicList;
	private List<String> procedureType;
	
	public ClinicListingDTO () {
		clinicList = new ArrayList<ClinicPreviewDTO> ();
		procedureType = new ArrayList<String> ();
	}
	
	public ClinicListingDTO(List<ClinicPreviewDTO> clinicList, List<String> procedureType) {
		super();
		this.clinicList = clinicList;
		this.procedureType = procedureType;
	}

	public List<ClinicPreviewDTO> getClinicList() {
		return clinicList;
	}

	public void setClinicList(List<ClinicPreviewDTO> clinicList) {
		this.clinicList = clinicList;
	}

	public List<String> getProcedureType() {
		return procedureType;
	}

	public void setProcedureType(List<String> procedureType) {
		this.procedureType = procedureType;
	}
	
	
	
}
