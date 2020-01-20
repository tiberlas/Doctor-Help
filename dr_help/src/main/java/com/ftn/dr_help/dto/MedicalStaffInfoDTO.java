package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.enums.RoleEnum;

public class MedicalStaffInfoDTO {

	private String email;
	private String firstName;
	private String lastName;
	private boolean canDelete;
	private RoleEnum role;
	
	public MedicalStaffInfoDTO() {
		super();
	}
	
	public MedicalStaffInfoDTO(String email, String firstName, String lastName, boolean canDelete, RoleEnum role) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.canDelete = canDelete;
		this.role = role;
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
	public boolean isCanDelete() {
		return canDelete;
	}
	public void setCanDelete(boolean canDelete) {
		this.canDelete = canDelete;
	}
	public RoleEnum getRole() {
		return role;
	}
	public void setRole(RoleEnum role) {
		this.role = role;
	}
	
	
}
