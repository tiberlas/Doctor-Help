package interfaces;

import java.util.ArrayList;
import java.util.Calendar;

import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;

public interface OperationRequestInterface {

	public Calendar getDate();
	public PatientPOJO getPatient();
	//public ProcedureType getOperationType();
	public ArrayList<DoctorPOJO> getDoctorList();
}
