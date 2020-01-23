package com.ftn.dr_help.dto;

import java.util.Calendar;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;

public class PatientHistoryDTO {

	public PatientHistoryDTO(String status, Long examinationReportId, String date, String procedureType, String doctor,
			String nurse, String clinicName, Long clinicId, Long doctorId, Long nurseId, Long appointmentId,
			boolean canCancel, String room, Double price, Double discount) {
		super();
		this.status = status;
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		this.nurse = nurse;
		this.clinicName = clinicName;
		this.clinicId = clinicId;
		this.doctorId = doctorId;
		this.nurseId = nurseId;
		this.appointmentId = appointmentId;
		this.canCancel = canCancel;
		this.room = room;
		this.price = price;
		this.discount = discount;
	}
	public PatientHistoryDTO(String status, Long examinationReportId, String date, String procedureType, String doctor,
			String nurse, String clinicName, Long clinicId, Long doctorId, Long nurseId, Long appointmentId,
			boolean canCancel, String room, Double price) {
		super();
		this.status = status;
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		this.nurse = nurse;
		this.clinicName = clinicName;
		this.clinicId = clinicId;
		this.doctorId = doctorId;
		this.nurseId = nurseId;
		this.appointmentId = appointmentId;
		this.canCancel = canCancel;
		this.room = room;
		this.price = price;
	}
	public PatientHistoryDTO(String status, Long examinationReportId, String date,
			String procedureType, String doctor, String nurse, String clinicName, Long clinicId, Long doctorId,
			Long nurseId, Long appointmentId, boolean canCancel) {
		super();
		this.status = status;
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		this.nurse = nurse;
		this.clinicName = clinicName;
		this.clinicId = clinicId;
		this.doctorId = doctorId;
		this.nurseId = nurseId;
		this.appointmentId = appointmentId;
		this.canCancel = canCancel;
	}

	DateConverter dateConverter = new DateConverter ();
	
	public PatientHistoryDTO() {
		super();
	}
	public PatientHistoryDTO(Long examinationReportId, String date, String procedureType, String doctor, String nurse,
			String clinicName, Long clinicId) {
		super();
		this.examinationReportId = examinationReportId;
		this.date = date;
		this.procedureType = procedureType;
		this.doctor = doctor;
		this.nurse = nurse;
		this.clinicName = clinicName;
		this.clinicId = clinicId;
	}
	
	public PatientHistoryDTO (AppointmentPOJO appointment) {
		switch (appointment.getStatus()) {
			case DONE: 
				this.status = "Done";
				break;
			case AVAILABLE:
				this.status = "Available";
				break;
			case APPROVED: 
				this.status = "Approved";
				break;
			case REQUESTED: 
				this.status = "Requested";
				break;
			default:
				this.status = "Unknown";
				break;
		}
		if (appointment.getExaminationReport() != null) {
			this.examinationReportId = appointment.getExaminationReport().getId();
		}
		this.date = dateConverter.toString(appointment.getDate());
		this.date += " " + appointment.getDate().get(Calendar.HOUR_OF_DAY) + ":" + appointment.getDate().get(Calendar.MINUTE);
		this.procedureType = appointment.getProcedureType().getName();
		this.doctor = appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName();
		this.nurse = appointment.getNurse().getFirstName() + " " + appointment.getNurse().getLastName();
		this.clinicName = appointment.getDoctor().getClinic().getName();
		this.clinicId = appointment.getDoctor().getClinic().getId();
		this.doctorId = appointment.getDoctor().getId();
		this.nurseId = appointment.getNurse().getId();
		this.appointmentId = appointment.getId();
		
		if (appointment.getRoom() != null) {
			this.room = appointment.getRoom().getName() + " " + appointment.getRoom().getNumber();
		}
//		this.price = appointment.getProcedureType().getPrice() * appointment.getDiscount();
		
//		this.props.value.price * (1 - (this.props.value.disscount / 100))
		this.price = appointment.getProcedureType().getPrice() * (1 - appointment.getDiscount() / 100);
		
		
		
		
		
		this.discount = appointment.getDiscount();
		
		
		
//		System.out.println("Appointment room: " + this.room);
//		System.out.println("Appointment price: " + this.price);
		 
		Calendar tempCal = Calendar.getInstance ();
		//System.out.println("Now: " + tempCal.getTime());
		tempCal.add(Calendar.DAY_OF_MONTH, 1);
		if (tempCal.after(appointment.getDate())) {
			//System.out.println("Ne smem da otkazem");
			this.canCancel = true;
		}
		else {
//			System.out.println("Smem da otkazem");
		}
	}
	
	String status;
	Long examinationReportId;
	String date;
	String procedureType;
	String doctor;
	String nurse;
	String clinicName;
	Long clinicId;
	Long doctorId;
	Long nurseId;
	Long appointmentId;
	boolean canCancel = false;
	String room;
	Double price;
	Double discount;
	
	public Long getExaminationReportId() {
		return examinationReportId;
	}
	public void setExaminationReportId(Long examinationReportId) {
		this.examinationReportId = examinationReportId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getProcedureType() {
		return procedureType;
	}
	public void setProcedureType(String procedureType) {
		this.procedureType = procedureType;
	}
	public String getDoctor() {
		return doctor;
	}
	public void setDoctor(String doctor) {
		this.doctor = doctor;
	}
	public String getNurse() {
		return this.nurse;
	}
	public void setNurse(String nurse) {
		this.nurse = nurse;
	}
	public String getClinicName() {
		return clinicName;
	}
	public void setClinicName(String clinicName) {
		this.clinicName = clinicName;
	}
	public Long getClinicId() {
		return clinicId;
	}
	public void setClinicId(Long clinicId) {
		this.clinicId = clinicId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}
	public Long getNurseId() {
		return this.nurseId;
	}
	public void setNurseId(Long nurseId) {
		this.nurseId = nurseId;
	}
	public Long getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	public boolean isCanCancel() {
		return canCancel;
	}
	public void setCanCancel(boolean canCancel) {
		this.canCancel = canCancel;
	}
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
		this.room = room;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	
}
