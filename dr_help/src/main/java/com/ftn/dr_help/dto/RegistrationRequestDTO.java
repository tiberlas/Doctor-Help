package com.ftn.dr_help.dto;

public class RegistrationRequestDTO {

	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private String address;
	private String city;
	private String state;
	private String phoneNumber;
	private Long insuranceNumber;
	private int birthDay;
	private int birthMonth;
	private int birthYear;
	private Long id;
	
	public RegistrationRequestDTO (String email, String password, String firstName, String lastName, 
				String address, String city, String state, String phoneNumber, Long insuranceNumber, 
				int birthDay, int birthMonth, int birthYear) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.city = city;
		this.state = state;
		this.phoneNumber = phoneNumber;
		this.insuranceNumber = insuranceNumber;
		this.birthDay = birthDay;
		this.birthMonth = birthMonth;
		this.birthYear = birthYear;
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
	public Long getInsuranceNumber() {
		return insuranceNumber;
	}
	public void setInsuranceNumber(Long insuranceNumber) {
		this.insuranceNumber = insuranceNumber;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public int getBirthDay() {
		return birthDay;
	}


	public void setBirthDay(int birthDay) {
		this.birthDay = birthDay;
	}


	public int getBirthMonth() {
		return birthMonth;
	}


	public void setBirthMonth(int birthMonth) {
		this.birthMonth = birthMonth;
	}


	public int getBirthYear() {
		return birthYear;
	}


	public void setBirthYear(int birthYear) {
		this.birthYear = birthYear;
	}
}
