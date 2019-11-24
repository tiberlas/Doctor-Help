package com.ftn.dr_help.dto;

import com.ftn.dr_help.model.enums.RoleEnum;

public class LoginResponseDTO {

	private Long id;
	private RoleEnum userRole;
	
	public LoginResponseDTO() {
		
	}
	
	public LoginResponseDTO(Long id, RoleEnum userRole) {
		super();
		this.id = id;
		this.userRole = userRole;
	}
	
	public LoginResponseDTO(LoginResponseDTO loginResponse) {
		super ();
		this.id = loginResponse.id;
		this.userRole = loginResponse.getUserRole();
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public RoleEnum getUserRole() {
		return userRole;
	}
	
	public void setUserRole(RoleEnum userRole) {
		this.userRole = userRole;
	}
	
}
