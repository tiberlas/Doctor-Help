package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar date;
	
	@ManyToOne (cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private PatientPOJO patient;
	
	@ManyToMany 
	@JoinTable (name = "operating", joinColumns = @JoinColumn (name = "operations_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn (name = "doctor_id", referencedColumnName = "id"))
	List<DoctorPOJO> doctorLIst;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private RoomPOJO room;
	
	@OneToOne (fetch = FetchType.LAZY)
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
	public List<DoctorPOJO> getDoctorLIst() {
		return doctorLIst;
	}
	public void setDoctorLIst(List<DoctorPOJO> doctorLIst) {
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
