package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ftn.dr_help.model.enums.BloodTypeEnum;

@Entity
@Table(name = "healthrecord")
public class HealthRecordPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToMany(mappedBy = "healthRecord", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<AllergyPOJO> alergyList;

	
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
	
	public List<AllergyPOJO> getAlergyList() {
		return alergyList;
	}
	
	
	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public void setAlergyList(List<AllergyPOJO> alergyList) {
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
