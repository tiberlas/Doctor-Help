package com.ftn.dr_help.model.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "room")
public class RoomPOJO implements Serializable{
	
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
	
	@NotBlank
	@Column(name = "number", nullable = false)
	private int number;
	
	@OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@Column(name = "proceduresTypes", nullable = false)
	private List<ProceduresTypePOJO> procedurasTypes = null;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private ClinicPOJO clinic;
	
	public RoomPOJO() {
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
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public List<ProceduresTypePOJO> getProcedurasTypes() {
		return procedurasTypes;
	}
	public void setProcedurasTypes(ArrayList<ProceduresTypePOJO> procedurasTypes) {
		this.procedurasTypes = procedurasTypes;
	}
	
	
	
	

}
