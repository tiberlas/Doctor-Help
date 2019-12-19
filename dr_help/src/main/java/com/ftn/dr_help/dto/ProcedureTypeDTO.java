package com.ftn.dr_help.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;

public class ProcedureTypeDTO {

	private Long id;
	private String name;
	private double price;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private Date duration;
	private boolean operation;

	public ProcedureTypeDTO() {
		super();
	}

	public ProcedureTypeDTO( Long id, String name, double price, Date duration, boolean operation) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.duration = duration;
		this.operation = operation;
	}

	public ProcedureTypeDTO(ProceduresTypePOJO procedure) {
		super();
		this.id = procedure.getId();
		this.name = procedure.getName();
		this.price = procedure.getPrice();
		this.duration = procedure.getDuration();
		this.operation = procedure.isOperation();
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

	public Date getDuration() {
		return duration;
	}

	public void setDuration(Date duration) {
		this.duration = duration;
	}

	public boolean isOperation() {
		return operation;
	}

	public void setOperation(boolean operation) {
		this.operation = operation;
	}

}
