package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.NursePOJO;

@Repository
public interface NurseRepository extends JpaRepository<NursePOJO, Long>{
	
	List<NursePOJO> findAllByClinic_id(Long id);
	NursePOJO findOneByEmail (String email);
	
	NursePOJO findOneById(Long id);
	
	@Query(value = "select count(a.nurse_id) from appointments a where a.status <> 'DONE' and a.deleted = false and a.nurse_id = ?1 group by a.nurse_id", nativeQuery = true)
	public Long getNursesAppointmentsCount(Long nurseId);

	//ovaj query je za ispitivanje istorije pregleda kod prosledjene sestre i prosledjenog pacijenta, 
		//sluzi za prikaz health-recorda na front endu
	@Query(value="select distinct count(a.*) from appointments a where a.nurse_id = ?1 and a.patient_id = ?2 and a.status = 'DONE' and deleted = false", nativeQuery=true)
	public Integer findDoneAppointmentForNurseCount(Long nurse_id, Long patient_id);
}
