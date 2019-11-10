package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

public class ProceduresTypePOJO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private double price;
	private boolean isOperation;
	private Calendar duration;
	
	public ProceduresTypePOJO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public boolean isOperation() {
		return isOperation;
	}
	public void setOperation(boolean isOperation) {
		this.isOperation = isOperation;
	}
	public Calendar getDuration() {
		return duration;
	}
	public void setDuration(Calendar duration) {
		this.duration = duration;
	}
	
	

}
