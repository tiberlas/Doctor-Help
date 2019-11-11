package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

public class ProceduresTypePOJO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "price", nullable = false)
	private double price;
	
	@Column(name = "isOperation", nullable = false)
	private boolean isOperation;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "duration", nullable = false)
	private Calendar duration;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private RoomPOJO room;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private ClinicPOJO clinic;
	
	
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
	public RoomPOJO getRoom() {
		return room;
	}
	public void setRoom(RoomPOJO room) {
		this.room = room;
	}
	public ClinicPOJO getClinic() {
		return clinic;
	}
	public void setClinic(ClinicPOJO clinic) {
		this.clinic = clinic;
	}
	
	

}
