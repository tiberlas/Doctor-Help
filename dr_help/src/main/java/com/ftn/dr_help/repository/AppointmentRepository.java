package com.ftn.dr_help.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;

public interface AppointmentRepository extends JpaRepository<AppointmentPOJO, Long>{

}
