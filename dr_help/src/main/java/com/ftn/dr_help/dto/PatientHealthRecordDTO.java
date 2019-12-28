package com.ftn.dr_help.dto;

import java.util.ArrayList;
import java.util.Date;

import com.ftn.dr_help.model.enums.BloodTypeEnum;

public class PatientHealthRecordDTO {

	
	private String firstName;
	private String lastName;
	private double weight;
	private double height;
	private Date birthday;
	private double diopter;
	private BloodTypeEnum bloodType;
	private ArrayList<String> allergyList;
	
	public PatientHealthRecordDTO() {
		
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
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public double getHeight() {
		return height;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public double getDiopter() {
		return diopter;
	}
	public void setDiopter(double diopter) {
		this.diopter = diopter;
	}
	public BloodTypeEnum getBloodType() {
		return bloodType;
	}
	public void setBloodType(BloodTypeEnum bloodType) {
		this.bloodType = bloodType;
	}
	public ArrayList<String> getAllergyList() {
		return allergyList;
	}
	public void setAllergyList(ArrayList<String> allergyList) {
		this.allergyList = allergyList;
	}
	
	
}
