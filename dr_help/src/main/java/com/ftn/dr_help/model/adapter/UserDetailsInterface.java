package com.ftn.dr_help.model.adapter;

import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.NursePOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.UserPOJO;

public interface UserDetailsInterface {

	UserPOJO getUser(CentreAdministratorPOJO pojo);
	UserPOJO getUser(ClinicAdministratorPOJO pojo);
	UserPOJO getUser(DoctorPOJO pojo);
	UserPOJO getUser(NursePOJO pojo);
	UserPOJO getUser(PatientPOJO pojo);

	
}
