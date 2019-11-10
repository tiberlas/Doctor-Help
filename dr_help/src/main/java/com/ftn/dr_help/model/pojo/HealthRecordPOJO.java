package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;

import com.ftn.dr_help.model.BloodTypeEnum;

public class HealthRecordPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ArrayList<String> alergyList;
	private double weight;
	private double height;
	private double diopter;
	private BloodTypeEnum bloodType;
	private ExaminationReportPOJO examinationReport;
	
	public HealthRecordPOJO () {
		super ();
	}
	
	public ArrayList<String> getAlergyList() {
		return alergyList;
	}
	public void setAlergyList(ArrayList<String> alergyList) {
		this.alergyList = alergyList;
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

	public ExaminationReportPOJO getExaminationReport() {
		return examinationReport;
	}

	public void setExaminationReport(ExaminationReportPOJO examinationReport) {
		this.examinationReport = examinationReport;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
