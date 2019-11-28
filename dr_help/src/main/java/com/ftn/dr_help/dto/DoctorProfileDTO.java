package com.ftn.dr_help.dto;

import java.util.Calendar;

import com.ftn.dr_help.model.pojo.DoctorPOJO;

public class DoctorProfileDTO {

	//private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String city;
	private String state;
	private String address;
	private String phoneNumber;
	private Calendar birthday;
	private Long clinicId;
	
	
	
	public DoctorProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public DoctorProfileDTO(DoctorPOJO doctor) {
		super();
		this.firstName = doctor.getFirstName();
		this.lastName = doctor.getLastName();
		this.email = doctor.getEmail();
		this.city = doctor.getCity();
		this.state = doctor.getState();
		this.address = doctor.getAddress();
		this.phoneNumber = doctor.getPhoneNumber();
		this.birthday = doctor.getBirthday();
		this.clinicId = doctor.getClinic().getId();
	}
	
	public DoctorProfileDTO(String firstName, String lastName, String email, String city, String state,
			String address, String phoneNumber, Calendar birthday, Long clinicId) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.city = city;
		this.state = state;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.birthday = birthday;
		this.clinicId = clinicId;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public Long getClinicId() {
		return clinicId;
	}
	public void setClinicId(Long clinicId) {
		this.clinicId = clinicId;
	}
	
	
}
