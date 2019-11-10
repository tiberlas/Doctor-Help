package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;

import enums.AppointmentStateEnum;

public class AppointmentPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Calendar date;
	private DoctorPOJO dostor;
	private NursePOJO nurse;
	private PatientPOJO patient;
	private AppointmentStateEnum status;
	private double discount;
	private ProceduresTypePOJO procedureType;
	private RoomPOJO room;
	
	
	public AppointmentPOJO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Calendar getDate() {
		return date;
	}
	public void setDate(Calendar date) {
		this.date = date;
	}
	public DoctorPOJO getDostor() {
		return dostor;
	}
	public void setDostor(DoctorPOJO dostor) {
		this.dostor = dostor;
	}
	public NursePOJO getNurse() {
		return nurse;
	}
	public void setNurse(NursePOJO nurse) {
		this.nurse = nurse;
	}
	public PatientPOJO getPatient() {
		return patient;
	}
	public void setPatient(PatientPOJO patient) {
		this.patient = patient;
	}
	public AppointmentStateEnum getStatus() {
		return status;
	}
	public void setStatus(AppointmentStateEnum status) {
		this.status = status;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public ProceduresTypePOJO getProcedureType() {
		return procedureType;
	}
	public void setProcedureType(ProceduresTypePOJO procedureType) {
		this.procedureType = procedureType;
	}
	public RoomPOJO getRoom() {
		return room;
	}
	public void setRoom(RoomPOJO room) {
		this.room = room;
	}
	
	
	
	
	
}
