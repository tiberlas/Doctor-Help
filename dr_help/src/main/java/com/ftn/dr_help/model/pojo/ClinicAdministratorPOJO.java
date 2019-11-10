package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import com.ftn.dr_help.model.RoleEnum;

public class ClinicAdministrator implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String address;
	private String city;
	private String state;
	private String phoneNumber;
	private RoleEnum role;
	private Calendar birthday;
	
	public ClinicAdministrator() {
		super();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public RoleEnum getRole() {
		return role;
	}
	public void setRole(RoleEnum role) {
		this.role = role;
	}
	public Calendar getBirthday() {
		return birthday;
	}
	public void setBirthday(Calendar birthday) {
		this.birthday = birthday;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
