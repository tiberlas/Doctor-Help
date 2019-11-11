package com.ftn.dr_help.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;

public interface AppointmentRepository extends JpaRepository<AppointmentPOJO, Long>{

}
