package com.ftn.dr_help.dto;

public class ChangePasswordDTO {

	private Long id;
	private String oldPassword;
	private String newPassword;
	
	public ChangePasswordDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ChangePasswordDTO(String oldPassword, String newPassword, Long id) {
		super();
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
		this.id = id;
	}
	
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
}
