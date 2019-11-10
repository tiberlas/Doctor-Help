package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;

public class OperationPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Calendar date;
	private PatientPOJO patient;
	private ArrayList<DoctorPOJO> doctorLIst;
	private RoomPOJO room;
	private ProceduresTypePOJO procedureType;
	
	public OperationPOJO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Calendar getDate() {
		return date;
	}
	public void setDate(Calendar date) {
		this.date = date;
	}
	public PatientPOJO getPatient() {
		return patient;
	}
	public void setPatient(PatientPOJO patient) {
		this.patient = patient;
	}
	public ArrayList<DoctorPOJO> getDoctorLIst() {
		return doctorLIst;
	}
	public void setDoctorLIst(ArrayList<DoctorPOJO> doctorLIst) {
		this.doctorLIst = doctorLIst;
	}
	public RoomPOJO getRoom() {
		return room;
	}
	public void setRoom(RoomPOJO room) {
		this.room = room;
	}
	public ProceduresTypePOJO getProcedureType() {
		return procedureType;
	}
	public void setProcedureType(ProceduresTypePOJO procedureType) {
		this.procedureType = procedureType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
