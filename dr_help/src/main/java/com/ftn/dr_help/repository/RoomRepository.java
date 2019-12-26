package com.ftn.dr_help.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.RoomPOJO;

@Repository
public interface RoomRepository extends JpaRepository <RoomPOJO, Long>{ 

	List<RoomPOJO> findAllByClinic_id(Long id);// nepotrebno namesti join
	
	Optional<RoomPOJO> findByIdAndClinic_id(Long id, Long clinic_id);
	Optional<RoomPOJO> findOneByName(String name);
	Optional<RoomPOJO> findOneByNumber(int number);

}
