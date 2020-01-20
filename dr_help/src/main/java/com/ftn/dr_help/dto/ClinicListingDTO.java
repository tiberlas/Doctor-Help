package com.ftn.dr_help.dto;

import java.util.ArrayList;
import java.util.List;

public class ClinicListingDTO {

	

	public ClinicListingDTO(List<ClinicPreviewDTO> clinicList, List<String> procedureType, String procedureTypeString,
			String dateString) {
		super();
		this.clinicList = clinicList;
		this.procedureType = procedureType;
		this.procedureTypeString = procedureTypeString;
		this.dateString = dateString;
	}


	private List<ClinicPreviewDTO> clinicList;
	private List<String> procedureType;
	private String procedureTypeString;
	private String dateString;
	
	public ClinicListingDTO () {
		clinicList = new ArrayList<ClinicPreviewDTO> ();
		procedureType = new ArrayList<String> ();
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


	public String getProcedureTypeString() {
		return procedureTypeString;
	}


	public void setProcedureTypeString(String procedureTypeString) {
		this.procedureTypeString = procedureTypeString;
	}


	public String getDateString() {
		return dateString;
	}


	public void setDateString(String dateString) {
		this.dateString = dateString;
	}
	
	
	
}
