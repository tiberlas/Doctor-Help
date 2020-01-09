package com.ftn.dr_help.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.DoctorReviewPOJO;

@Repository
public interface DoctorReviewRepository extends JpaRepository<DoctorReviewPOJO, Long> {
	
	@Query (value = "select * from doctor_reviewpojo dr where dr.patient_id = ?1 and dr.doctor_id = ?2", nativeQuery = true)
	public DoctorReviewPOJO getPatientsReview (Long patientId, Long doctorId);
	
	@Modifying
	@Query (value = "update doctor_reviewpojo set rating = ?1 where doctor_id = ?2 and patient_id = ?3", nativeQuery = true)
	public int updateReview (Integer newRating, Long patientId, Long doctorId);
	
	@Query (value = "select avg(rating) from doctor_reviewpojo dr where dr.doctor_id = ?1", nativeQuery = true)
	public Float getAverageReview (Long doctorId);
	
}
