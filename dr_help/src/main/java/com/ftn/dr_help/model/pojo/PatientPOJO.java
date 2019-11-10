package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import com.ftn.dr_help.model.enums.RoleEnum;

public class PatientPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String address;
	private String city;
	private String state;
	private String phoneNumber;
	private Long id;
	private RoleEnum role;
	private Calendar birthday;
	private Long insuranceNumber;
	private HealthRecordPOJO healthRecord;
	
	public PatientPOJO() {
		super();
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Calendar getBirthday() {
		return birthday;
	}
	public void setBirthday(Calendar birthday) {
		this.birthday = birthday;
	}
	public long getInsuranceNumber() {
		return insuranceNumber;
	}
	public void setInsuranceNumber(long insuranceNumber) {
		this.insuranceNumber = insuranceNumber;
	}
	public RoleEnum getRole() {
		return role;
	}
	public void setRole(RoleEnum role) {
		this.role = role;
	}
	public HealthRecordPOJO getHealthRecord() {
		return healthRecord;
	}
	public void setHealthRecord(HealthRecordPOJO healthRecord) {
		this.healthRecord = healthRecord;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setInsuranceNumber(Long insuranceNumber) {
		this.insuranceNumber = insuranceNumber;
	}
	
}
