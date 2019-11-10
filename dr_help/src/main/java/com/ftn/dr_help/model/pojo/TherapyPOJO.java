package com.ftn.dr_help.model.pojo;

import java.io.Serializable;

public class TherapyPOJO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String advice;
	private PerscriptionPOJO perscription;
	
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
	

}