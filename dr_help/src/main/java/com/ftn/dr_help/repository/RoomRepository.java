package com.ftn.dr_help.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.RoomPOJO;

@Repository
public interface RoomRepository extends JpaRepository <RoomPOJO, Long>{ 

	List<RoomPOJO> findAllByClinic_id(Long id);// nepotrebno namesti join
	
	Optional<RoomPOJO> findByIdAndClinic_id(Long id, Long clinic_id);
	Optional<RoomPOJO> findOneByName(String name);
	Optional<RoomPOJO> findOneByNumber(int number);
	
	@Query(value = "select distinct r.* from room r inner join appointments a on r.id = a.room_id where a.status <> 'DONE' and a.deleted = FALSE", nativeQuery = true)
	List<RoomPOJO> getAllReservedRooms();

}
