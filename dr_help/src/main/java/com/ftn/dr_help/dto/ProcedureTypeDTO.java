package com.ftn.dr_help.dto;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;

public class ProcedureTypeDTO {

	private Long id;
	private String name;
	private double price;
	
	@Column(name = "isOperation", nullable = false)
	private boolean isOperation;
	
	//@Temporal(TemporalType.TIME)
	@Column(name = "duration", nullable = false)
	private LocalTime duration;
	
	@OneToOne(fetch = FetchType.LAZY)
	private AppointmentPOJO appointment;
	
	@OneToMany(mappedBy = "procedurasTypes", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<RoomPOJO> roomList;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private ClinicPOJO clinic;
	
}
