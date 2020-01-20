package com.ftn.dr_help.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.comon.AppPasswordEncoder;
import com.ftn.dr_help.comon.DailySchedule;
import com.ftn.dr_help.comon.EmailCheck;
import com.ftn.dr_help.comon.Term;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorListingDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.DoctorProfilePreviewDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffSaveingDTO;
import com.ftn.dr_help.dto.PatientHealthRecordDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.dto.business_hours.BusinessDayHoursDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.AllergyPOJO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.HealthRecordPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.validation.PasswordValidate;

@Service
public class DoctorService {

	@Autowired
	private DoctorRepository repository;
	
	@Autowired
	private AppPasswordEncoder encoder;
	
	@Autowired
	private PasswordValidate passwordValidate;
	
	@Autowired
	private ConcreteUserDetailInterface convertor;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private EmailCheck check;
	
	public List<DoctorProfileDTO> findAll(Long clinicID) {
		if(clinicID == null) {
			return null;
		}
		
		List<DoctorPOJO> finded = repository.findAllByClinic_id(clinicID);
		if(finded == null)
			return null;
		
		List<DoctorProfileDTO> ret = new ArrayList<DoctorProfileDTO>();
		for(DoctorPOJO doctor : finded) {
			if(!doctor.isDeleted()) {
				//logic delete
				if(doctor.isDeleted()) {
					continue;
				}
				
				ret.add(new DoctorProfileDTO(doctor));				
			}
		}
		
		if(ret.isEmpty()) {
			return null;
		}
		
		return ret;
	}
	
	public DoctorProfileDTO findOne(Long clinicID, Long doctorID) {
		if(clinicID == null || doctorID == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findById(doctorID).orElse(null);
		if(finded == null || finded.isDeleted() || !finded.getClinic().getId().equals(clinicID)) {
			return null;
		}
		
		//logic delete
		if(finded.isDeleted()) {
			return null;
		}
		
		return new DoctorProfileDTO(finded);
	}
	
	public MedicalStaffProfileDTO findByEmail(String email) {
		if(email == null) {
			return null;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		
		if(finded == null) {
			return null;
		}
		
		//logic delete
		if(finded.isDeleted()) {
			return null;
		}
		
		return new MedicalStaffProfileDTO(finded);		
	}
	
	public DoctorPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		DoctorPOJO ret = repository.findById(id).orElse(null);
		
		//logic delete
		if(ret.isDeleted()) {
			return null;
		}
		
		return ret;
	}
	
	public MedicalStaffProfileDTO save(UserDetailDTO doctor, String email) {
		if(doctor == null) {
			return null;
		}
		
		DoctorPOJO current = repository.findOneByEmail(email);
		if(current == null)
			return null;
		
		//ProfileValidationInterface validate = new ProfileValidation();
		//ConcreteUserDetailInterface convertsToDoctor = new ConcreteUserDetail();
		//logic delete
		if(current.isDeleted()) {
			return null;
		}
		
		
		convertor.changeTo(current, doctor);
		repository.save(current);
				
		return new MedicalStaffProfileDTO(current);
	}
	
	public boolean changePassword(ChangePasswordDTO password, String email) {
		if(password == null) {
			return false;
		}
		
		DoctorPOJO finded = repository.findOneByEmail(email);
		if(finded == null)
			return false;
		
		//logic delete
		if(finded.isDeleted()) {
			return false;
		}
		
		if(passwordValidate.isValid(password, finded.getPassword())) {
			String encoded = encoder.getEncoder().encode(password.getNewPassword());
			finded.setPassword(encoded);
			finded.setMustChangePassword(false);
			repository.save(finded);
			return true;
		}
		
		return false;
	}
	
	public List<DoctorListingDTO> filterByClinicAndProcedureType (Long clinicId, String procedureType) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.filterByClinicAndProcedureType(clinicId, procedureType);
		for (DoctorPOJO d : doctors) {
			System.out.println("For petlja u filteru po oba");
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> getAllUnfiltered () {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors = repository.findAll();
		for (DoctorPOJO d : doctors) {
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add (new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public List<DoctorListingDTO> filterByClinic (Long clinicId) {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		List<DoctorPOJO> doctors =  repository.findAllByClinic_id(clinicId);
		for (DoctorPOJO d : doctors) {
			//logic delete
			if(d.isDeleted()) {
				continue;
			}
			retVal.add(new DoctorListingDTO (d));
		}
		return retVal;
	}
	
	public DoctorProfilePreviewDTO getProfilePreview (Long id) {
		DoctorPOJO doctor = repository.getOne(id);
		if (doctor == null) {
			return null;
		}
		//logic delete
		if(doctor.isDeleted()) {
			return null;
		}
		
		DoctorProfilePreviewDTO retVal = new DoctorProfilePreviewDTO (doctor);
		return retVal;
	}
	
	public PatientHealthRecordDTO findPatientHealthRecord(Long appointmentId) {
		
		AppointmentPOJO app = appointmentRepository.findOneById(appointmentId);
		
		if(app == null) {
			System.out.println("Appointment with id: " + appointmentId+ " not found.");
			return null;
		}
		
		PatientPOJO patient = app.getPatient();
		
		if(patient == null) {
			System.out.println("Patient from appointment with id: " + appointmentId + " not found");
			return null;
		}
		
		HealthRecordPOJO healthRecord = patient.getHealthRecord();
		List<AllergyPOJO> allergies= healthRecord.getAllergyList();
		
		ArrayList<String> list = new ArrayList<String>();
		
		for (AllergyPOJO allergy : allergies) {
			list.add(allergy.getAllergy());
		}

		
		PatientHealthRecordDTO retVal = new PatientHealthRecordDTO();
		
		retVal.setBirthday(patient.getBirthday().getTime());
		retVal.setBloodType(healthRecord.getBloodType());
		retVal.setDiopter(healthRecord.getDiopter());
		retVal.setFirstName(patient.getFirstName());
		retVal.setHeight(healthRecord.getHeight());
		retVal.setLastName(patient.getLastName());
		retVal.setWeight(healthRecord.getWeight());
		retVal.setAllergyList(list);
		
		System.out.println("FIRSTNAME: " + retVal.getFirstName() + "BIRTHDAY: " + retVal.getBirthday() + " BLOODTYPE: " + retVal.getBloodType() + "ALLERGYLIST: " + retVal.getAllergyList());
		
		return retVal;
	}

	public boolean save(MedicalStaffSaveingDTO newDoctorDTO, String email) {
		try {
			ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
			ClinicPOJO clinic = admin.getClinic();
			
			if(!check.checkIfValid(newDoctorDTO.getEmail())) {
				return false;
			}
			
			DoctorPOJO newDoctor = new DoctorPOJO();
			newDoctor.setFirstName(newDoctorDTO.getFirstName());
			newDoctor.setLastName(newDoctorDTO.getLastName());
			newDoctor.setEmail(newDoctorDTO.getEmail());
			newDoctor.setAddress("...");
			newDoctor.setCity("...");
			newDoctor.setState("...");
			newDoctor.setPhoneNumber("...");
			Calendar birthday = Calendar.getInstance();
			birthday.setTime(newDoctorDTO.getBirthday());
			newDoctor.setBirthday(birthday);
			newDoctor.setClinic(clinic);
			newDoctor.setMonday(newDoctorDTO.getMonday());
			newDoctor.setTuesday(newDoctorDTO.getTuesday());
			newDoctor.setWednesday(newDoctorDTO.getWednesday());
			newDoctor.setThursday(newDoctorDTO.getThursday());
			newDoctor.setFriday(newDoctorDTO.getFriday());
			newDoctor.setSaturday(newDoctorDTO.getSaturday());
			newDoctor.setSunday(newDoctorDTO.getSunday());
			newDoctor.setDeleted(false);
			newDoctor.setMustChangePassword(true);
			
			String encoded = encoder.getEncoder().encode("DoctorHelp");
			newDoctor.setPassword(encoded);
	
			repository.save(newDoctor);
		} catch (Exception e) {
			return false;
		}
		
		return true;
	}
	
	public boolean delete(Long id) {
		try {
			
			DoctorPOJO doctor = repository.findById(id).orElse(null);
			
			doctor.setDeleted(true);
			repository.save(doctor);
			
		} catch(Exception e) {
			return false;
		}
		
		return true;
	}
	
	public List<DoctorListingDTO> filterByClinicDateProcedureType (Long clinicId, String procedureType, String dateString) throws ParseException {
		List<DoctorListingDTO> retVal = new ArrayList<DoctorListingDTO> ();
		
		SimpleDateFormat sdf = new SimpleDateFormat ("yyyyy-MM-dd hh:mm:ss");
		String dateMinString = dateString + " 00:00:00";
		String dateMaxString = dateString + " 23:59:59";
		Date dateMin = sdf.parse (dateMinString);
		Date dateMax = sdf.parse (dateMaxString);
		
		Calendar calendarMin = Calendar.getInstance ();
		Calendar calendarMax = Calendar.getInstance ();
		
		calendarMin.setTime(dateMin);
		calendarMax.setTime(dateMax);
		
		
		
		List<DoctorPOJO> doctors = repository.filterByClinicAndProcedureType(clinicId, procedureType);
		for (DoctorPOJO d : doctors) {
			DailySchedule schedule;
			switch (calendarMin.get(Calendar.DAY_OF_WEEK)) {
				case Calendar.MONDAY:
					schedule = new DailySchedule (calendarMin, d.getMonday());
					break;
				case Calendar.TUESDAY:
					schedule = new DailySchedule (calendarMin, d.getTuesday());
					break;
				case Calendar.WEDNESDAY:
					schedule = new DailySchedule (calendarMin, d.getWednesday());
					break;
				case Calendar.THURSDAY:
					schedule = new DailySchedule (calendarMin, d.getThursday());
					break;
				case Calendar.FRIDAY:
					schedule = new DailySchedule (calendarMin, d.getFriday());
					break;
				case Calendar.SATURDAY:
					schedule = new DailySchedule (calendarMin, d.getSaturday());
					break;
				default:
					schedule = new DailySchedule (calendarMin, d.getSunday());
					break;
			}
			List<AppointmentPOJO> appointments = appointmentRepository.getDoctorsAppointments(d.getId(), calendarMin, calendarMax);
			for (AppointmentPOJO a : appointments) {
				schedule.addAppointment(a);
			}
			DoctorListingDTO temp = new DoctorListingDTO (d);
			List<Term> terms = schedule.getAvaliableTerms(d.getProcedureType());
			List<String> times = new ArrayList<String> ();
			for (Term t : terms) {
				String tempTime = "";
				tempTime += t.getTime().get(Calendar.HOUR_OF_DAY);
				tempTime += ":";
				tempTime += t.getTime().get(Calendar.MINUTE);
				times.add(tempTime);
			}
			
			temp.setTerms(times);
			
			retVal.add(temp);
		}
		
		
		
		return retVal;
	}
	
	
	public List<BusinessDayHoursDTO> getDoctorBusinessHours(Long doctor_id) { //metoda racuna smene i prikazuje ih na kalendaru u prikladnom json formatu
		//za primer formata, udji u BusinessDayHoursDTO
		DoctorPOJO doctor = repository.findOneById(doctor_id);
		
		List<BusinessDayHoursDTO> businessDayList = new ArrayList<BusinessDayHoursDTO>();
		
		
		if(!doctor.getMonday().toString().equals("NONE")) { //ako radi ponedeljkom = Shift != NONE
			BusinessDayHoursDTO businessDayHoursDTO = new BusinessDayHoursDTO();
			List<Integer> day = new ArrayList<Integer>();	
			day.add(1); //1 == Monday
			businessDayHoursDTO.setDaysOfWeek(day);
			if(doctor.getMonday().toString().equals("FIRST")) { //ako radi prvu smenu
				businessDayHoursDTO.setStartTime("08:00");
				businessDayHoursDTO.setEndTime("16:00");
			} else if(doctor.getMonday().toString().equals("SECOND")) {
				businessDayHoursDTO.setStartTime("16:00");
				businessDayHoursDTO.setEndTime("24:00");
			} else if(doctor.getMonday().toString().equals("THIRD")) {
				businessDayHoursDTO.setStartTime("00:00");
				businessDayHoursDTO.setEndTime("08:00");
			}
			businessDayList.add(businessDayHoursDTO);
		}
		
		if(!doctor.getTuesday().toString().equals("NONE")) { //ako radi utorkom = Shift != NONE
			BusinessDayHoursDTO businessDayHoursDTO = new BusinessDayHoursDTO();
			List<Integer> day = new ArrayList<Integer>();	
			day.add(2); //2 == Tuesday
			businessDayHoursDTO.setDaysOfWeek(day);
			if(doctor.getTuesday().toString().equals("FIRST")) { //ako radi prvu smenu
				businessDayHoursDTO.setStartTime("08:00");
				businessDayHoursDTO.setEndTime("16:00");
			} else if(doctor.getTuesday().toString().equals("SECOND")) {
				businessDayHoursDTO.setStartTime("16:00");
				businessDayHoursDTO.setEndTime("24:00");
			} else if(doctor.getTuesday().toString().equals("THIRD")) {
				businessDayHoursDTO.setStartTime("00:00");
				businessDayHoursDTO.setEndTime("08:00");
			}
			businessDayList.add(businessDayHoursDTO);
		}
		
		
		if(!doctor.getWednesday().toString().equals("NONE")) { //ako radi sredom = Shift != NONE
			BusinessDayHoursDTO businessDayHoursDTO = new BusinessDayHoursDTO();
			List<Integer> day = new ArrayList<Integer>();	
			day.add(3); //3 == Wednesday
			businessDayHoursDTO.setDaysOfWeek(day);
			if(doctor.getWednesday().toString().equals("FIRST")) { //ako radi prvu smenu
				businessDayHoursDTO.setStartTime("08:00");
				businessDayHoursDTO.setEndTime("16:00");
			} else if(doctor.getWednesday().toString().equals("SECOND")) {
				businessDayHoursDTO.setStartTime("16:00");
				businessDayHoursDTO.setEndTime("24:00");
			} else if(doctor.getWednesday().toString().equals("THIRD")) {
				businessDayHoursDTO.setStartTime("00:00");
				businessDayHoursDTO.setEndTime("08:00");
			}
			businessDayList.add(businessDayHoursDTO);
		}
		
		
		if(!doctor.getThursday().toString().equals("NONE")) { //ako radi cetvrtkom = Shift != NONE
			BusinessDayHoursDTO businessDayHoursDTO = new BusinessDayHoursDTO();
			List<Integer> day = new ArrayList<Integer>();	
			day.add(4); //4 == Thursday
			businessDayHoursDTO.setDaysOfWeek(day);
			if(doctor.getThursday().toString().equals("FIRST")) { //ako radi prvu smenu
				businessDayHoursDTO.setStartTime("08:00");
				businessDayHoursDTO.setEndTime("16:00");
			} else if(doctor.getThursday().toString().equals("SECOND")) {
				businessDayHoursDTO.setStartTime("16:00");
				businessDayHoursDTO.setEndTime("24:00");
			} else if(doctor.getThursday().toString().equals("THIRD")) {
				businessDayHoursDTO.setStartTime("00:00");
				businessDayHoursDTO.setEndTime("08:00");
			}
			businessDayList.add(businessDayHoursDTO);
		}
		

		if(!doctor.getFriday().toString().equals("NONE")) { //ako radi petkom = Shift != NONE
			BusinessDayHoursDTO businessDayHoursDTO = new BusinessDayHoursDTO();
			List<Integer> day = new ArrayList<Integer>();	
			day.add(5); //5 == Friday
			businessDayHoursDTO.setDaysOfWeek(day);
			if(doctor.getFriday().toString().equals("FIRST")) { //ako radi prvu smenu
				businessDayHoursDTO.setStartTime("08:00");
				businessDayHoursDTO.setEndTime("16:00");
			} else if(doctor.getFriday().toString().equals("SECOND")) {
				businessDayHoursDTO.setStartTime("16:00");
				businessDayHoursDTO.setEndTime("24:00");
			} else if(doctor.getFriday().toString().equals("THIRD")) {
				businessDayHoursDTO.setStartTime("00:00");
				businessDayHoursDTO.setEndTime("08:00");
			}
			businessDayList.add(businessDayHoursDTO);
		}
		
		
		return businessDayList;
		
	}
	
}
