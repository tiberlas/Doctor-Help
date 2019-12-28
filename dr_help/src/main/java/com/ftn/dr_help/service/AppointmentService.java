package com.ftn.dr_help.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.dto.DoctorAppointmentDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	

	public List<DoctorAppointmentDTO> findDoctorAppointments(Long doctor_id) {
		
		List<AppointmentPOJO> list = appointmentRepository.findDoctorAppointments(doctor_id);
		
		List<DoctorAppointmentDTO> appointments = new ArrayList<DoctorAppointmentDTO>();
		
		int i = 0;
		for (AppointmentPOJO appointmentPOJO : list) {
			if(!appointmentPOJO.isDeleted()) {
				System.out.println("-------------------" + i);
				DoctorAppointmentDTO dto = convertAppointmentToDTO(appointmentPOJO);
				appointments.add(dto);
				i++;
			}
		}
		
		
		
		return appointments;
	}
	
	
	private DoctorAppointmentDTO convertAppointmentToDTO(AppointmentPOJO appointment) {
		
		DoctorAppointmentDTO dto = new DoctorAppointmentDTO();
		
		DoctorPOJO doctor = appointment.getDoctor();
		System.out.println("DOCA JE" + doctor.getFirstName());
		
		PatientPOJO patient = appointment.getPatient();
		if(patient == null) {
			dto.setPatientFirstName("-");
			dto.setPatientLastName("-");
			
		}
		else {
			System.out.println("PACIJENT JE:" + patient.getFirstName());
			dto.setPatientFirstName(patient.getFirstName());
			dto.setPatientLastName(patient.getLastName());
		}
		
		ProceduresTypePOJO pt = appointment.getProcedureType();
		dto.setProcedureName(pt.getName());
		
		dto.setStartDate(appointment.getDate().getTime());
		System.out.println("START IS" + appointment.getDate().getTime());
		
		Calendar end = Calendar.getInstance(); // creates calendar
		end.setTime(appointment.getDate().getTime()); // sets calendar time/date
		
		Calendar duration = Calendar.getInstance();
		duration.setTime(pt.getDuration());
		end.add(Calendar.HOUR_OF_DAY, duration.get(Calendar.HOUR)); //dodaje sate
		end.add(Calendar.MINUTE, duration.get(Calendar.MINUTE)); //dodaje minute
		System.out.println("AND END IS: " + end.getTime());
		dto.setEndDate(end.getTime());
		
		
		dto.setProcedureName(pt.getName());
		
		dto.setPrice(String.valueOf(appointment.getProcedureType().getPrice()));
		System.out.println("PRICE IS: " + dto.getPrice());
		dto.setDiscount(String.valueOf(appointment.getDiscount()));
		System.out.println("DISCOUNT IS: " + dto.getDiscount());
		dto.setStatus(String.valueOf(appointment.getStatus()));
		
		dto.setIsOperation(pt.isOperation());
		dto.setRoomName(appointment.getRoom().getName());
		dto.setRoomNumber(String.valueOf(appointment.getRoom().getNumber()));
		
		dto.setAppointment_id(appointment.getId());
		
		return dto;
		
	}
	

}
