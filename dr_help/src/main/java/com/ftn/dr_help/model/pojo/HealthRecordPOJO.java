package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.ftn.dr_help.model.enums.BloodTypeEnum;

public class HealthRecordPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@OneToMany(mappedBy = "healthrecordpojo", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private ArrayList<String> alergyList;
	
	@Column(name = "weight", nullable = true)
	private double weight;
	
	@Column(name = "height", nullable = true)
	private double height;
	
	@Column(name = "diopter", nullable = true)
	private double diopter;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "bloodType", nullable = true)
	private BloodTypeEnum bloodType;
	
	
	@OneToOne(fetch = FetchType.LAZY)
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
