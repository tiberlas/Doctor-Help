package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table (name = "operations")
public class OperationPOJO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar date;
	
	@OneToMany (mappedBy = "operations", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private PatientPOJO patient;
	
	@ManyToMany 
	@JoinTable (name = "operating", joinColumns = @JoinColumn (name = "operations_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn (name = "doctor_id", referencedColumnName = "id"))
	private ArrayList<DoctorPOJO> doctorLIst;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private RoomPOJO room;
	
	@OneToMany(mappedBy = "operations", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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
