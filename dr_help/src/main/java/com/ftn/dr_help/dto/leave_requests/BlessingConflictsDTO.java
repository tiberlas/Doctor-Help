package com.ftn.dr_help.dto.leave_requests;

import com.ftn.dr_help.model.enums.LeaveRequestValidationEnum;

public class BlessingConflictsDTO {

	private LeaveRequestValidationEnum validationEnum;
	private Integer approvedAppointmentsCount;
	
	
	public BlessingConflictsDTO() {
		
	}
	
	public LeaveRequestValidationEnum getValidationEnum() {
		return validationEnum;
	}
	public void setValidationEnum(LeaveRequestValidationEnum validationEnum) {
		this.validationEnum = validationEnum;
	}
	public Integer getApprovedAppointmentsCount() {
		return approvedAppointmentsCount;
	}
	public void setApprovedAppointmentsCount(Integer approvedAppointmentsCount) {
		this.approvedAppointmentsCount = approvedAppointmentsCount;
	}
}
