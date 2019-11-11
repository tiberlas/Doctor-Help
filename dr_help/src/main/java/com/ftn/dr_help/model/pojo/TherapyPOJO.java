package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Entity
public class TherapyPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column (name = "advice", nullable = true)
	private String advice;
	
	@OneToOne (fetch = FetchType.LAZY)
	private PerscriptionPOJO perscription;
	
	@OneToOne(fetch = FetchType.LAZY)
	private ExaminationReportPOJO examinationReport;
	
	public String getAdvice() {
		return advice;
	}
	public void setAdvice(String advice) {
		this.advice = advice;
	}
	public PerscriptionPOJO getPerscription() {
		return perscription;
	}
	public void setPerscription(PerscriptionPOJO perscription) {
		this.perscription = perscription;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public ExaminationReportPOJO getExaminationReport() {
		return examinationReport;
	}
	public void setExaminationReport(ExaminationReportPOJO examinationReport) {
		this.examinationReport = examinationReport;
	}
	

}
