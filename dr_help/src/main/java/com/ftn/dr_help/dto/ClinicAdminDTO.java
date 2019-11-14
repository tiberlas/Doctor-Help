package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;

public class ClinicAdminDTO {
	private String email;
	private String firstName;
	private String lastName;
	private Long clinicId;
	
	public ClinicAdminDTO() {
		
	}
	
	public ClinicAdminDTO(String email, String firstName, String lastName, Long id) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.clinicId = id;
	}

	public ClinicAdminDTO(ClinicAdministratorPOJO admin) {
		this(admin.getEmail(), admin.getFirstName(), admin.getLastName(), admin.getClinic().getId());
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getClinicId() {
		return clinicId;
	}

	public void setClinicId(Long clinicId) {
		this.clinicId = clinicId;
	}
}
