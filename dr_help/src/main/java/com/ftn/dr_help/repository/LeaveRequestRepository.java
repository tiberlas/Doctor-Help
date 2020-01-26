package com.ftn.dr_help.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.LeaveRequestPOJO;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequestPOJO, Long> {

	LeaveRequestPOJO findOneById(Long id);
	/* -- get all staff requests - for request history table*/
	@Query(value="select lr.* from leave_requests lr where nurse_id = ?1 order by lr.last_day desc", nativeQuery=true)
	public List<LeaveRequestPOJO> getNurseLeaveRequests(Long nurse_id);
	
	@Query(value="select lr.* from leave_requests lr where doctor_id = ?1 order by lr.last_day desc", nativeQuery=true)
	public List<LeaveRequestPOJO> getDoctorLeaveRequests(Long doctor_id);
	/* -- */
	
	/* -- get Approved staff requests - for schedule display*/
	@Query(value="select lr.* from leave_requests lr where doctor_id = ?1 and lr.leave_status = 'APPROVED'", nativeQuery=true)
	public List<LeaveRequestPOJO> getDoctorApprovedLeaveRequests(Long doctor_id);
	
	@Query(value="select lr.* from leave_requests lr where nurse_id = ?1 and lr.leave_status = 'APPROVED'", nativeQuery=true)
	public List<LeaveRequestPOJO> getNurseApprovedLeaveRequests(Long nurse_id);
	/* -- */
	
	@Query(value="select lr.* from leave_requests lr where lr.leave_status = 'REQUESTED' and lr.last_day > ?1", nativeQuery=true)
	public List<LeaveRequestPOJO> getAdminRequests(Date now);
	
	
}
