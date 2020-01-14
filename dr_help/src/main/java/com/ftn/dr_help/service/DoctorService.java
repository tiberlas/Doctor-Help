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
import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.comon.EmailCheck;
import com.ftn.dr_help.comon.Term;
import com.ftn.dr_help.comon.schedule.CalculateFirstFreeSchedule;
import com.ftn.dr_help.dto.ChangePasswordDTO;
import com.ftn.dr_help.dto.DoctorListingDTO;
import com.ftn.dr_help.dto.DoctorProfileDTO;
import com.ftn.dr_help.dto.DoctorProfilePreviewDTO;
import com.ftn.dr_help.dto.MedicalStaffNameDTO;
import com.ftn.dr_help.dto.MedicalStaffProfileDTO;
import com.ftn.dr_help.dto.MedicalStaffSaveingDTO;
import com.ftn.dr_help.dto.OperationRequestDTO;
import com.ftn.dr_help.dto.PatientHealthRecordDTO;
import com.ftn.dr_help.dto.ThreeDoctorsIdDTO;
import com.ftn.dr_help.dto.UserDetailDTO;
import com.ftn.dr_help.model.convertor.ConcreteUserDetailInterface;
import com.ftn.dr_help.model.pojo.AllergyPOJO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.HealthRecordPOJO;
import com.ftn.dr_help.model.pojo.PatientPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.ProcedureTypeRepository;
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
	private ProcedureTypeRepository procedureRepository;
	
	@Autowired
	private CalculateFirstFreeSchedule calculate;
	
	@Autowired
	private DateConverter dateConvertor;
	
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
			
			ProceduresTypePOJO procedureType = procedureRepository.getOne(newDoctorDTO.getProcedureId());
			
			if(!clinic.getProcedureTypesList().contains(procedureType)) {
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
			newDoctor.setProcedureType(procedureType);
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
	
	public String findFirstFreeSchedue(String email) {
		
		try {
			
			DoctorPOJO doctor = repository.findOneByEmail(email);
			List<Date> dates = repository.findAllReservedAppointments(doctor.getId());
			Calendar begin = Calendar.getInstance();
			begin.add(Calendar.DAY_OF_MONTH, 1);
			begin.clear(Calendar.SECOND);
			begin.clear(Calendar.MILLISECOND);
			
			Calendar firstFree = calculate.findFirstScheduleForDoctor(doctor, begin, dates);
			
			return dateConvertor.dateForFrontEndString(firstFree);
		} catch (Exception e) {
			return null;
		}
	}
	
	public String findFirstFreeSchedueForOperation(ThreeDoctorsIdDTO doctors) {
		try {
			
			Calendar begin0 = Calendar.getInstance();
			begin0.add(Calendar.DAY_OF_MONTH, 1);
			
			Calendar free = findFirstOperationSchedule(doctors.getDoctor0(), doctors.getDoctor1(), doctors.getDoctor2(), begin0);
			//sva tri datuma su ista
			return dateConvertor.dateForFrontEndString(free);
		} catch (Exception e) {
			return null;
		}
	}
	
	public Calendar checkSchedue(String email, Calendar requestedSchedule) {
		
		DoctorPOJO doctor = repository.findOneByEmail(email);
		List<Date> dates = repository.findAllReservedAppointments(doctor.getId());
		
		return calculate.checkScheduleOrFindFirstFree(doctor, requestedSchedule, dates);
	}
	
	public String checkOperationSchedue(OperationRequestDTO request) {
		
		try {
			Calendar begin0 = dateConvertor.stringToDate(request.getDateAndTimeString());
			
			Calendar free = findFirstOperationSchedule(request.getDoctor0(), request.getDoctor1(), request.getDoctor2(), begin0);
			//sva tri datuma su ista
			
			if(free.equals(begin0)) {
				return request.getDateAndTimeString();
			} else {
				return dateConvertor.dateForFrontEndString(free);
			}
		} catch (Exception e) {
			return null;
		}
	}
	
	public List<MedicalStaffNameDTO> getSpecializedDoctors(Long procedureTypeId) {
		try {
			
			List<DoctorPOJO> finded = repository.findAllDoctorsWihtSpetialization(procedureTypeId);
			List<MedicalStaffNameDTO> doctors = new ArrayList<>();
			
			if(finded == null) {
				return doctors;
			}
			
			for(DoctorPOJO doctor : finded) {
				doctors.add(new MedicalStaffNameDTO(
							doctor.getId(),
							doctor.getFirstName(),
							doctor.getLastName()
						));
			}
			
			return doctors;
		} catch(Exception e) {
			System.out.println("ZASTO");
			e.printStackTrace();
			return null;
		}
	}
	
	private Calendar findFirstOperationSchedule(Long drId0, Long drId1, Long drId2, Calendar begin) throws Exception {
		DoctorPOJO dr0 = repository.findById(drId0).orElse(null);
		DoctorPOJO dr1 = repository.findById(drId1).orElse(null);
		DoctorPOJO dr2 = repository.findById(drId2).orElse(null);
		if(dr0 == null || dr1 == null || dr2 == null) {
			return null;
		}
		
		List<Date> dates0 = repository.findAllReservedAppointments(dr0.getId());
		List<Date> dates1 = repository.findAllReservedAppointments(dr1.getId());
		List<Date> dates2 = repository.findAllReservedAppointments(dr2.getId());
		Calendar begin0 = (Calendar) begin.clone();
		begin0.clear(Calendar.SECOND);
		begin0.clear(Calendar.MILLISECOND);
		
		Calendar begin1 = (Calendar) begin0.clone();
		Calendar begin2 = (Calendar) begin0.clone();
		
		Calendar free0 = null;
		Calendar free1 = null;
		Calendar free2 = null;
		
		//nadji privi slobodan termin koji odgovara svim doctorima
		do {
			
			if(free0 != null) {
				//znaci da je jedna iteracija prosla; sad treba samo begin da se pomeri za najveci nadjeni datum
				
				if(free0.after(free1) && free0.after(free2)) {
					begin0 = (Calendar) free0.clone();
				} else if(free1.after(free2)) {
					begin0 = (Calendar) free1.clone();
				} else {
					begin0 = (Calendar) free2.clone();
				}
				
				begin0.add(Calendar.DAY_OF_MONTH, 1);
				begin1 = (Calendar) begin0.clone();
				begin2 = (Calendar) begin0.clone();
			}
			
			free0 = calculate.findFirstScheduleForDoctor(dr0, begin0, dates0);
			free1 = calculate.findFirstScheduleForDoctor(dr1, begin1, dates1);
			free2 = calculate.findFirstScheduleForDoctor(dr2, begin2, dates2);
			
			System.out.println("DEBUG FOR OPERATION");
			System.out.println(dateConvertor.dateForFrontEndString(free0));
			System.out.println(dateConvertor.dateForFrontEndString(free1));
			System.out.println(dateConvertor.dateForFrontEndString(free2));
		} while(! (free0.equals(free1) && free1.equals(free2)) );
		
		return free0;
	}
	
}
