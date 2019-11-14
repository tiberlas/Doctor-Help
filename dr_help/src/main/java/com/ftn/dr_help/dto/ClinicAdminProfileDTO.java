package com.ftn.dr_help.dto;

import java.util.Calendar;

import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;

public class ClinicAdminProfileDTO {

	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private String address;
	private String city;
	private String state;
	private String phoneNumber;
	private Calendar birthday;
	
	public ClinicAdminProfileDTO(ClinicAdministratorPOJO admin) {
		this.id = admin.getId();
		this.email = admin.getEmail();
		this.firstName = admin.getFirstName();
		this.lastName = admin.getLastName();
		this.address = admin.getAddress();
		this.city = admin.getCity();
		this.state = admin.getState();
		this.phoneNumber = admin.getPhoneNumber();
		this.birthday = admin.getBirthday();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public Calendar getBirthday() {
		return birthday;
	}
	public void setBirthday(Calendar birthday) {
		this.birthday = birthday;
	}
	
	
}
