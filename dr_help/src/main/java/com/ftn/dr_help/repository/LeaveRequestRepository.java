package com.ftn.dr_help.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.LeaveRequestPOJO;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequestPOJO, Long> {

	
	@Query(value="select lr.* from leave_requests lr where nurse_id = ?1 order by lr.last_day desc", nativeQuery=true)
	public List<LeaveRequestPOJO> getNurseLeaveRequests(Long nurse_id);
	
	@Query(value="select lr.* from leave_requests lr where doctor_id = ?1 order by lr.last_day desc", nativeQuery=true)
	public List<LeaveRequestPOJO> getDoctorLeaveRequests(Long doctor_id);
	
	
}
