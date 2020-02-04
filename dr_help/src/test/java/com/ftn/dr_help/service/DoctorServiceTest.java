package com.ftn.dr_help.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.comon.schedule.CalculateFirstFreeSchedule;
import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.DoctorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DoctorServiceTest {

	@Mock
	private DoctorService service;
	
	@Mock
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DateConverter dateConverter;
	
	@Autowired
	private CalculateFirstFreeSchedule calculate;
	
	private DoctorPOJO dr0 = new DoctorPOJO();
	private DoctorPOJO dr1 = new DoctorPOJO();
	private DoctorPOJO dr2 = new DoctorPOJO();
	
	private List<Date> dates0;
	private List<Date> dates1;
	private List<Date> dates2;
	
	@Before
	public void setUp() {
        MockitoAnnotations.initMocks(this);
        
        Calendar duration = Calendar.getInstance();
        duration.set(2000, 2, 15, 2, 0);
        
        ProceduresTypePOJO type = new ProceduresTypePOJO();
        type.setId(13l);
        type.setDuration(duration.getTime());
        type.setDeleted(false);
        type.setOperation(false);
        
        getOperations();
        
        dr0.setId(0l);
        dr0.setDeleted(false);
        dr0.setMonday(Shift.FIRST);
        dr0.setTuesday(Shift.FIRST);
        dr0.setWednesday(Shift.NONE);
        dr0.setThursday(Shift.SECOND);
        dr0.setFriday(Shift.SECOND);
        dr0.setSaturday(Shift.NONE);
        dr0.setSunday(Shift.NONE);
        dr0.setProcedureType(type);
        
        dr2.setId(2l);
        dr2.setDeleted(false);
        dr2.setMonday(Shift.NONE);
        dr2.setTuesday(Shift.THIRD);
        dr2.setWednesday(Shift.SECOND);
        dr2.setThursday(Shift.SECOND);
        dr2.setFriday(Shift.SECOND);
        dr2.setSaturday(Shift.NONE);
        dr2.setSunday(Shift.NONE);
        dr2.setProcedureType(type);
        
        dr1.setId(1l);
        dr1.setDeleted(false);
        dr1.setMonday(Shift.NONE);
        dr1.setTuesday(Shift.FIRST);
        dr1.setWednesday(Shift.NONE);
        dr1.setThursday(Shift.SECOND);
        dr1.setFriday(Shift.SECOND);
        dr1.setSaturday(Shift.NONE);
        dr1.setSunday(Shift.NONE);
        dr1.setProcedureType(type);
	}
	
	private void getOperations() {
		dates0 = new ArrayList<>();
		dates1 = new ArrayList<>();
		dates2 = new ArrayList<>();
		
		Calendar c00 = Calendar.getInstance();
		Calendar c01 = Calendar.getInstance();
		Calendar c02 = Calendar.getInstance();
		Calendar c03 = Calendar.getInstance();
		Calendar c10 = Calendar.getInstance();
		Calendar c11 = Calendar.getInstance();
		Calendar c12 = Calendar.getInstance();
		Calendar c20 = Calendar.getInstance();
		Calendar c21 = Calendar.getInstance();
		Calendar c22 = Calendar.getInstance();
		Calendar c23 = Calendar.getInstance();
		
		c00.set(2020, 0, 13, 8, 10);
		c01.set(2020, 0, 13, 12, 10);
		c02.set(2020, 0, 16, 17, 10);
		c03.set(2020, 0, 16, 20, 0); //22:00
		c10.set(2020, 0, 14, 8, 10);
		c11.set(2020, 0, 14, 13, 10);
		c12.set(2020, 0, 16, 16, 10);//18:10
		c20.set(2020, 0, 14, 2, 10);
		c21.set(2020, 0, 15, 18, 10);
		c22.set(2020, 0, 16, 16, 10);
		c23.set(2020, 0, 16, 19, 20);//21:20

		c00.clear(Calendar.SECOND);
		c00.clear(Calendar.MILLISECOND);
		c01.clear(Calendar.SECOND);
		c01.clear(Calendar.MILLISECOND);
		c02.clear(Calendar.SECOND);
		c02.clear(Calendar.MILLISECOND);
		c03.clear(Calendar.SECOND);
		c03.clear(Calendar.MILLISECOND);
		c10.clear(Calendar.SECOND);
		c10.clear(Calendar.MILLISECOND);
		c11.clear(Calendar.SECOND);
		c11.clear(Calendar.MILLISECOND);
		c12.clear(Calendar.SECOND);
		c12.clear(Calendar.MILLISECOND);
		c20.clear(Calendar.SECOND);
		c20.clear(Calendar.MILLISECOND);
		c21.clear(Calendar.SECOND);
		c21.clear(Calendar.MILLISECOND);
		c22.clear(Calendar.SECOND);
		c22.clear(Calendar.MILLISECOND);
		c23.clear(Calendar.SECOND);
		c23.clear(Calendar.MILLISECOND);
		
		dates0.add(c00.getTime());
		dates0.add(c01.getTime());
		dates0.add(c02.getTime());
		dates0.add(c03.getTime());
		dates1.add(c10.getTime());
		dates1.add(c11.getTime());
		dates1.add(c12.getTime());
		dates2.add(c20.getTime());
		dates2.add(c12.getTime());
		dates2.add(c22.getTime());
		dates2.add(c23.getTime());
		
	}
	
	@Test
	public void test() {
		//test za mocking
		DoctorPOJO doca = new DoctorPOJO();
		doca.setId(1l);
		doca.setDeleted(false);
		doca.setFirstName("TIBI");
		Mockito.when(this.doctorRepository.findById(0l)).thenReturn(Optional.of(doca));
		
		DoctorPOJO dr = doctorRepository.findById(0l).orElse(null);
		
		assertEquals("TIBI", dr.getFirstName());
	}
	
//	@Test
//	public void FindFirstEqualShiftOperationTest() throws ParseException {
//		try {
//			Calendar begin = Calendar.getInstance();
//			begin = dateConverter.stringToDate("2020-01-15 08:00");
//			
//			Calendar finded;
//			finded = calculate.findFirstShiftForOperation(dr0, dr1, dr2, dates0, dates1, dates2, begin);
//		
//			Calendar expected = Calendar.getInstance();
//			expected.set(Calendar.DAY_OF_MONTH, 17);
//			expected.set(Calendar.HOUR, 16);
//			expected.set(Calendar.MINUTE, 00);
//			expected.clear(Calendar.SECOND);
//			expected.clear(Calendar.MILLISECOND);
//			
//			assertEquals(expected, finded);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	@Test
//	public void FindFirstEqualShiftOperation2Test() throws ParseException {
//		try {
//			Calendar begin = Calendar.getInstance();
//			begin = dateConverter.stringToDate("2020-01-15 08:00");
//			
//			dr2.setThursday(Shift.NONE);
//			dates2.remove(3);
//			dates2.remove(2);
//			
//			Calendar finded;
//			finded = calculate.findFirstShiftForOperation(dr0, dr1, dr2, dates0, dates1, dates2, begin);
//		
//			Calendar expected = Calendar.getInstance();
//			expected.set(Calendar.DAY_OF_MONTH, 17);
//			expected.set(Calendar.HOUR, 16);
//			expected.set(Calendar.MINUTE, 00);
//			expected.clear(Calendar.SECOND);
//			expected.clear(Calendar.MILLISECOND);
//			
//			assertEquals(expected, finded);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	@Test
//	public void FindFirstEqualShiftOperation3Test() throws ParseException {
//		try {
//			Calendar begin = Calendar.getInstance();
//			begin = dateConverter.stringToDate("2020-01-15 08:00");
//			
//			dr2.setFriday(Shift.NONE);
//			dr0.setMonday(Shift.FIRST);
//			dr1.setMonday(Shift.FIRST);
//			
//			Calendar finded;
//			finded = calculate.findFirstShiftForOperation(dr0, dr1, dr2, dates0, dates1, dates2, begin);
//		
//			Calendar expected = Calendar.getInstance();
//			expected.set(Calendar.DAY_OF_MONTH, 20);
//			expected.set(Calendar.HOUR, 8);
//			expected.set(Calendar.MINUTE, 00);
//			expected.clear(Calendar.SECOND);
//			expected.clear(Calendar.MILLISECOND);
//			
//			assertEquals(expected, finded);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	@Test
//	public void FindFirstEqualShiftOperation4Test() throws ParseException {
//		try {
//			Calendar begin = Calendar.getInstance();
//			begin = dateConverter.stringToDate("2020-01-15 08:00");
//			
//			dr2.setFriday(Shift.NONE);
//			
//			Calendar finded;
//			finded = calculate.findFirstShiftForOperation(dr0, dr1, dr2, dates0, dates1, dates2, begin);
//		
//			Calendar expected = Calendar.getInstance();
//			expected.set(Calendar.DAY_OF_MONTH, 23);
//			expected.set(Calendar.HOUR, 16);
//			expected.set(Calendar.MINUTE, 00);
//			expected.clear(Calendar.SECOND);
//			expected.clear(Calendar.MILLISECOND);
//			
//			assertEquals(expected, finded);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
	
//	@Test
//	public void CheckOperationTest() throws ParseException {
//		Mockito.when(this.doctorRepository.findById(0l)).thenReturn(Optional.of(dr0));
//		Mockito.when(this.doctorRepository.findById(1l)).thenReturn(Optional.of(dr1));
//		Mockito.when(this.doctorRepository.findById(2l)).thenReturn(Optional.of(dr2));
//		
//		Mockito.when(this.doctorRepository.findAllReservedOperations(0l)).thenReturn(dates0);
//		Mockito.when(this.doctorRepository.findAllReservedOperations(1l)).thenReturn(dates1);
//		Mockito.when(this.doctorRepository.findAllReservedOperations(2l)).thenReturn(dates2);
//	
//		Calendar begin = Calendar.getInstance();
//		begin = dateConverter.stringToDate("2020-01-23 18:05");
//		
//		Calendar finded = service.findFirstOperationSchedule(0l, 1l, 2l, begin);
//	
//		Calendar expected = Calendar.getInstance();
//		expected.set(Calendar.DAY_OF_MONTH, 23);
//		expected.set(Calendar.HOUR, 18);
//		expected.set(Calendar.MINUTE, 05);
//		expected.clear(Calendar.SECOND);
//		expected.clear(Calendar.MILLISECOND);
//		
//		assertEquals(expected, finded);
//	}
	
}
