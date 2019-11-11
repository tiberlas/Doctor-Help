package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ftn.dr_help.model.enums.RoleEnum;

@Entity
public class LeaveRequestPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@OneToOne(fetch = FetchType.LAZY)
	private DoctorPOJO idDoc;
	
	@OneToOne(fetch = FetchType.LAZY)
	private NursePOJO idNur;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "staffrole", nullable = false)
	private RoleEnum staffRole;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar firstDay;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar lastDay;
	
	public LeaveRequestPOJO() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public NursePOJO getIdNur() {
		return idNur;
	}

	public void setIdNur(NursePOJO idNur) {
		this.idNur = idNur;
	}
	
	
	

}
