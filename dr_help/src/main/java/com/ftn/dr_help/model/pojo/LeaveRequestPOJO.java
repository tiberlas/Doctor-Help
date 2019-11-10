package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import enums.RoleEnum;

public class LeaveRequestPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long staffId;
	private RoleEnum staffRole;
	private Calendar firstDay;
	private Calendar lastDay;
	
	public LeaveRequestPOJO() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getStaffId() {
		return staffId;
	}

	public void setStaffId(Long staffId) {
		this.staffId = staffId;
	}

	public RoleEnum getStaffRole() {
		return staffRole;
	}

	public void setStaffRole(RoleEnum staffRole) {
		this.staffRole = staffRole;
	}

	public Calendar getFirstDay() {
		return firstDay;
	}

	public void setFirstDay(Calendar firstDay) {
		this.firstDay = firstDay;
	}

	public Calendar getLastDay() {
		return lastDay;
	}

	public void setLastDay(Calendar lastDay) {
		this.lastDay = lastDay;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	

}
