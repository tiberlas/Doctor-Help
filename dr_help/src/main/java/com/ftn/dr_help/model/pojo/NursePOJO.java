package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import com.ftn.dr_help.model.enums.RoleEnum;

@Entity
@Table(name = "nurse")
public class NursePOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Column(name = "password", nullable = false)
	private String password;
	
	@NotBlank
	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private RoleEnum role = RoleEnum.NURSE;
	
	@NotBlank
	@Column(name = "firstName", nullable = false)
	private String firstName;
	
	@NotBlank
	@Column(name = "lastName", nullable = false)
	private String lastName;
	
	@NotBlank
	@Column(name = "email", nullable = false)
	private String email;
	
	@NotBlank
	@Column(name = "state", nullable = false)
	private String state;
	
	@NotBlank
	@Column(name = "city", nullable = false)
	private String city;
	
	@NotBlank
	@Column(name = "address", nullable = false)
	private String address;
	
	@NotBlank
	@Column(name = "phoneNumber", nullable = false)
	private String phoneNumber;
	
	@NotBlank
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "birthDay", nullable = false)
	private Calendar birthday;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private ClinicPOJO clinic;
	
	@OneToOne(fetch = FetchType.LAZY)
	private LeaveRequestPOJO leaveRequest;
	
	public NursePOJO() {
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
	public RoleEnum getRole() {
		return role;
	}
	public void setRole(RoleEnum role) {
		this.role = role;
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
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
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

	public ClinicPOJO getClinic() {
		return clinic;
	}

	public void setClinic(ClinicPOJO clinic) {
		this.clinic = clinic;
	}

	public LeaveRequestPOJO getLeaveRequest() {
		return leaveRequest;
	}

	public void setLeaveRequest(LeaveRequestPOJO leaveRequest) {
		this.leaveRequest = leaveRequest;
	}
	
	
}
