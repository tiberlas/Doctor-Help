package com.ftn.dr_help.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ftn.dr_help.comon.DailySchedule;
import com.ftn.dr_help.dto.ClinicDTO;
import com.ftn.dr_help.dto.ClinicListingDTO;
import com.ftn.dr_help.dto.ClinicPreviewDTO;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.ClinicReviewPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.repository.AppointmentRepository;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;
import com.ftn.dr_help.repository.ClinicRepository;
import com.ftn.dr_help.repository.ClinicReviewRepository;
import com.ftn.dr_help.repository.DoctorRepository;
import com.ftn.dr_help.repository.PatientRepository;
import com.ftn.dr_help.validation.ClinicValidation;


@Service()
public class ClinicService {

	@Autowired
	private ClinicRepository repository;
	
	@Autowired
	private ClinicAdministratorRepository adminRepository;
	
	@Autowired
	private ClinicValidation clinicValidation;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private ClinicReviewRepository clinicReviewRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	public ClinicPOJO findOne(Long id) {
		if(id == null) {
			return null;
		}
		
		return repository.findById(id).orElseGet(null); 	
	}
	
	public ClinicDTO findOneDTO(Long id) {
		if(id == null) {
			return null;
		}
		
		ClinicPOJO ret = repository.findById(id).orElseGet(null);
		
		if(ret == null) {
			return null;
		}
		
		return new ClinicDTO(ret); 	
	}
	
	public List<ClinicPOJO> findAll() {
		return repository.findAll();
	}


	public ClinicPOJO save(ClinicPOJO clinic) {
		if(clinic == null) {
			return null;
		}
		
		return repository.save(clinic);
	}
	
	public ClinicDTO save(ClinicDTO clinic, String email) {
		if(email == null) {
			return null;
		}
		
		if(clinicValidation.isValid(clinic)) {
			return null;
		}
		
		ClinicAdministratorPOJO admin = adminRepository.findOneByEmail(email);
		if(admin == null) {
			return null;
		}
		
		ClinicPOJO oldClinic = admin.getClinic();
		if(oldClinic == null || !(oldClinic.getId().equals(clinic.getId())) ) {
			return null;
		}
		
		//ClinicUpdate.update(oldClinic, clinic);
		oldClinic.setName(clinic.getName());
		oldClinic.setAddress(clinic.getAddress());
		oldClinic.setState(clinic.getState());
		oldClinic.setCity(clinic.getCity());
		oldClinic.setDescription(clinic.getDescription());
		repository.save(oldClinic);
		
		return new ClinicDTO(oldClinic);
	}
	
	public ClinicPOJO findByName(String name) {
		return repository.findByName(name);
	}
	
	public List<ClinicPOJO> filterByProcedureType (String procedureType) {
		return repository.getClinicsByProcedureType(procedureType);
	}

	public List<ClinicPOJO> filterByDate (List<ClinicPOJO> inputList, String procedureType, String dateString) throws ParseException {
		System.out.println("filter: " + procedureType);
		System.out.println("date: " + dateString);
		SimpleDateFormat sdf = new SimpleDateFormat ("yyyyy-MM-dd hh:mm:ss");
		String dateMinString = dateString + " 00:00:00";
		String dateMaxString = dateString + " 23:59:59";
		
		
//		System.out.println("Date min string: " + dateMinString);
//		System.out.println("Date max string: " + dateMaxString);
		
		Date dateMin = sdf.parse (dateMinString);
		Date dateMax = sdf.parse (dateMaxString);
		
		Calendar calendarMin = Calendar.getInstance ();
		Calendar calendarMax = Calendar.getInstance ();
		
		calendarMin.setTime(dateMin);
		calendarMax.setTime(dateMax);
		
		List<ClinicPOJO> retVal = new ArrayList<ClinicPOJO> ();
// 		List<ClinicPOJO> clinics = repository.filterByAppointmentType (procedureType);
//		if (clinics.size() == 0) {
//			System.out.println("Nisam nasao appointment");
//			//clinics = repository.fliterByProcedure();
//			return inputList;
//		}
		System.out.println("Input list size: " + inputList.size());
 		for (ClinicPOJO c : inputList) {
			List<DoctorPOJO> doctors;
			if (procedureType.equals("unfiltered")) {
				doctors = doctorRepository.findAllByClinic_id(c.getId());
			}
			else {
				doctors = doctorRepository.filterByClinicAndProcedureType (c.getId(), procedureType);
			}
			System.out.println("Doctor list size: " + doctors.size());
			System.out.println("Clinic id: " + c.getId() + "; Procedure type: " + procedureType);
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
				List<AppointmentPOJO> appointments = appointmentRepository.getDoctorsAppointments (d.getId(), calendarMin, calendarMax);
				for (AppointmentPOJO a : appointments) {
					schedule.addAppointment(a);
				}
				if (schedule.getAvaliableTerms(d.getProcedureType()).size() > 0) {
					if (!retVal.contains(c)) {
						retVal.add(c);
					}
				}
			}
		}
		
		return retVal;
	}
	
	@Transactional
	public void addReview (Long patientId, Long clinicId, Integer review) {
		ClinicReviewPOJO newReview = new ClinicReviewPOJO (repository.getOne(clinicId), patientRepository.getOne (patientId), review);
		ClinicReviewPOJO oldReview = clinicReviewRepository.getClinicReview (patientId, clinicId);
		if (review == 0) {
			clinicReviewRepository.delete(oldReview);
		}
		else if (oldReview == null) {
			clinicReviewRepository.save(newReview);
		}
		else {
			clinicReviewRepository.updateReview(review, patientId, clinicId);
		}
	}

	public ClinicListingDTO doOtherFilters(ClinicListingDTO input, String state, String city, String address, String minRat, String maxRat, String minPrice, String maxPrice) {
		
		List<String> stateNames = new ArrayList<String> ();
		List<String> cityNames = new ArrayList<String> ();
		List<String> addressNames = new ArrayList<String> ();
		for (ClinicPreviewDTO cp : input.getClinicList()) {
			boolean isThere = false;
			// Set up states
			for (String s : stateNames) {
				if (s.equals(cp.getState())) {
					isThere = true;
					break;
				}
			}
			if (!isThere) {
				stateNames.add(cp.getState());
			}
			
			isThere = false;
			for (String s : cityNames) {
				if (s.equals(cp.getCity())) {
					isThere = true;
					break;
				}
			}
			if (!isThere) {
				cityNames.add(cp.getCity());
			}
			
			isThere = false; 
			for (String s : addressNames) {
				if (s.equals(cp.getAddress())) {
					isThere = true;
					break;
				}
			}
			if (!isThere) {
				addressNames.add(cp.getAddress());
			}
		}
		input.setStateList(stateNames);
		input.setCityList(cityNames);
		input.setAddressList(addressNames);
		
		if (!state.equals("unfiltered")) {
			List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
			for (ClinicPreviewDTO temp : input.getClinicList()) {
				if (temp.getState().equals(state)) {
					tempList.add(temp);
				}
			}
			input.setClinicList(tempList);
		}
		
		if (!city.equals("unfiltered")) {
			List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
			for (ClinicPreviewDTO temp : input.getClinicList()) {
				if (temp.getCity().equals(city)) {
					tempList.add(temp);
				}
			}
			input.setClinicList(tempList);
		}
		
		if (!address.equals("unfiltered")) {
			List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
			for (ClinicPreviewDTO temp : input.getClinicList()) {
				if (temp.getAddress().equals(address)) {
					tempList.add(temp);
				}
			}
			input.setClinicList(tempList);
		}
		
		if ((!minRat.equals("1")) && (!minRat.equals("unfiltered"))) {
			Integer mRat = Integer.parseInt(minRat);
			if (mRat != null) {
				List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
				for (ClinicPreviewDTO temp : input.getClinicList()) {
					if (temp.getRating().equals("/")) {
						continue;
					}
					Float tempInt = Float.parseFloat(temp.getRating());
					if (tempInt != null) {
						if (mRat <= tempInt) {
							tempList.add(temp);
						}
					}
				}
				input.setClinicList(tempList);
			}
		}
		
		if ((!maxRat.equals("5")) && (!maxRat.equals("unfiltered"))) {
			Integer mRat = Integer.parseInt(maxRat);
			if (mRat != null) {
				List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
				for (ClinicPreviewDTO temp : input.getClinicList()) {
					if (temp.getRating().equals("/")) {
						continue;
					}
					Float tempInt = Float.parseFloat(temp.getRating());
					if (tempInt != null) {
						if (mRat >= tempInt) {
							tempList.add(temp);
						}
					}
				}
				input.setClinicList(tempList);
			}
		}
		
		if (!minPrice.equals("unfiltered")) {
			Float price = Float.parseFloat(minPrice);
			if (price != null) {
				List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
				for (ClinicPreviewDTO temp : input.getClinicList()) {
					if (temp.getPrice().equals("/")) {
						continue;
					}
					Float tempFloat = Float.parseFloat(temp.getPrice().split(" ")[0]);
					if (tempFloat != null) {
						if (price <= tempFloat) {
							tempList.add(temp);
						}
					}
				}
				input.setClinicList(tempList);
			}
		}
		
		if (!maxPrice.equals("unfiltered")) {
			Float price = Float.parseFloat(maxPrice);
			if (price != null) {
				List<ClinicPreviewDTO> tempList = new ArrayList<ClinicPreviewDTO> ();
				for (ClinicPreviewDTO temp : input.getClinicList()) {
					if (temp.getPrice().equals("/")) {
						continue;
					}
					Float tempFloat = Float.parseFloat(temp.getPrice().split(" ")[0]);
					if (tempFloat != null) {
						if (price >= tempFloat) {
							tempList.add(temp);
						}
					}
				}
				input.setClinicList(tempList);
			}
		}
		
		return input;
	}
	
}
