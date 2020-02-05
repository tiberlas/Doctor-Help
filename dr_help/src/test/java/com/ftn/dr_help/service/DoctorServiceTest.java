package com.ftn.dr_help.service;

import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.ftn.dr_help.comon.DateConverter;
import com.ftn.dr_help.comon.schedule.CalculateFirstFreeSchedule;
import com.ftn.dr_help.dto.AbsenceInnerDTO;
import com.ftn.dr_help.model.convertor.WorkScheduleAdapter;
import com.ftn.dr_help.model.enums.Shift;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.ProceduresTypePOJO;
import com.ftn.dr_help.repository.DoctorRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DoctorServiceTest {

	@InjectMocks
	private DoctorService service;
	
	@MockBean
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DateConverter dateConverter;
	
	@Autowired
	private CalculateFirstFreeSchedule calculate;
	
	@Autowired
	private WorkScheduleAdapter workSchedule;
	
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

		c00.set(Calendar.SECOND, 0);
		c00.set(Calendar.MILLISECOND, 0);
		c01.set(Calendar.SECOND, 0);
		c01.set(Calendar.MILLISECOND, 0);
		c02.set(Calendar.SECOND, 0);
		c02.set(Calendar.MILLISECOND, 0);
		c03.set(Calendar.SECOND, 0);
		c03.set(Calendar.MILLISECOND, 0);
		c10.set(Calendar.SECOND, 0);
		c10.set(Calendar.MILLISECOND, 0);
		c11.set(Calendar.SECOND, 0);
		c11.set(Calendar.MILLISECOND, 0);
		c12.set(Calendar.SECOND, 0);
		c12.set(Calendar.MILLISECOND, 0);
		c20.set(Calendar.SECOND, 0);
		c20.set(Calendar.MILLISECOND, 0);
		c21.set(Calendar.SECOND, 0);
		c21.set(Calendar.MILLISECOND, 0);
		c22.set(Calendar.SECOND, 0);
		c22.set(Calendar.MILLISECOND, 0);
		c23.set(Calendar.SECOND, 0);
		c23.set(Calendar.MILLISECOND, 0);
		
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
	public void testMocking() {
		System.out.println(1);
		
		DoctorPOJO doca = new DoctorPOJO();
		doca.setId(1l);
		doca.setDeleted(false);
		doca.setFirstName("TIBI");
		Mockito.when(this.doctorRepository.findById(0l)).thenReturn(Optional.of(doca));
		
		DoctorPOJO dr = doctorRepository.findById(0l).orElse(null);
		
		assertEquals("TIBI", dr.getFirstName());
	}
	
	@Test
	public void findScheduleTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-15 08:00");
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 22, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleOnRoundTimeTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-13 08:00");
			
			dates0.clear();
			Calendar date = Calendar.getInstance();
			
			date.set(2020, 0, 13, 8, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			date.set(2020, 0, 13, 12, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 13, 10, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleOnRoundTimeTest2() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-13 08:00");
			
			dates0.clear();
			Calendar date = Calendar.getInstance();
			
			date.set(2020, 0, 13, 8, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			date.set(2020, 0, 13, 10, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 13, 12, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleOnRoundTimeTest3() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-13 08:00");
			
			dates0.clear();
			Calendar date = Calendar.getInstance();
			
			date.set(2020, 0, 13, 8, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			date.set(2020, 0, 13, 10, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			date.set(2020, 0, 13, 12, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			date.set(2020, 0, 13, 14, 0, 0);
			date.set(Calendar.MILLISECOND, 0);
			dates0.add(date.getTime());
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 14, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleJumpTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 13, 12, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);

			Calendar newDate  = Calendar.getInstance();
			newDate.set(2020, 0, 13, 14, 10, 0);
			newDate.set(Calendar.MILLISECOND, 0);
			dates0.add(2, newDate.getTime());
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 14, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleBeforeTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 12, 12, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);

			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 13, 10, 10, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleAfterTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 13, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);

			dr0.setTuesday(Shift.NONE);
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 22, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleTest1() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 11, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			Calendar newDate  = Calendar.getInstance();
			newDate.set(2020, 0, 13, 10, 10, 0);
			newDate.set(Calendar.MILLISECOND, 0);
			dates0.add(1, newDate.getTime());
			
			System.out.println("LISTA DATUMA :)");
			for(Date d : dates0) {
				System.out.println(d.toString());
			}
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, null);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 14, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleWithHolidayTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 7, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			List<AbsenceInnerDTO> absence = new ArrayList<>();
			Calendar absenceBegin = Calendar.getInstance();
			Calendar absenceEnd = Calendar.getInstance();
			
			absenceBegin.set(2020, 0, 8, 0, 0, 0);
			absenceEnd.set(2020, 0, 12, 0, 0, 0);
			
			absence.add(new AbsenceInnerDTO(absenceBegin.getTime(), absenceEnd.getTime()));
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, absence);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 13, 10, 10, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}

	@Test
	public void findScheduleWithHolidayTest1() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 13, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			List<AbsenceInnerDTO> absence = new ArrayList<>();
			Calendar absenceBegin = Calendar.getInstance();
			Calendar absenceEnd = Calendar.getInstance();
			
			absenceBegin.set(2020, 0, 14, 0, 0, 0);
			absenceEnd.set(2020, 0, 18, 0, 0, 0);
			
			absence.add(new AbsenceInnerDTO(absenceBegin.getTime(), absenceEnd.getTime()));
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, absence);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 20, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleWithHolidayTest2() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 13, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			List<AbsenceInnerDTO> absence = new ArrayList<>();
			Calendar absenceBegin = Calendar.getInstance();
			Calendar absenceEnd = Calendar.getInstance();
			
			absenceBegin.set(2020, 0, 25, 0, 0, 0);
			absenceEnd.set(2020, 0, 28, 0, 0, 0);
			
			absence.add(new AbsenceInnerDTO(absenceBegin.getTime(), absenceEnd.getTime()));
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, absence);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 14, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void findScheduleWithHolidayTest3() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 8, 18, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			Calendar newDate  = Calendar.getInstance();
			newDate.set(2020, 0, 13, 10, 10, 0);
			newDate.set(Calendar.MILLISECOND, 0);
			dates0.add(1, newDate.getTime());
			
			newDate.set(2020, 0, 13, 14, 10, 0);
			newDate.set(Calendar.MILLISECOND, 0);
			dates0.add(3, newDate.getTime());
			
			System.out.println("LISTA DATUMA");
			for(Date d : dates0) {
				System.out.println(d.toString());
			}
			
			List<AbsenceInnerDTO> absence = new ArrayList<>();
			Calendar absenceBegin = Calendar.getInstance();
			Calendar absenceEnd = Calendar.getInstance();
			
			absenceBegin.set(2020, 0, 9, 0, 0, 0);
			absenceEnd.set(2020, 0, 11, 0, 0, 0);
			absence.add(new AbsenceInnerDTO(absenceBegin.getTime(), absenceEnd.getTime()));
			
			absenceBegin.set(2020, 0, 14, 0, 0, 0);
			absenceEnd.set(2020, 0, 16, 0, 0, 0);
			absence.add(new AbsenceInnerDTO(absenceBegin.getTime(), absenceEnd.getTime()));
			
			Calendar finded;
			finded = calculate.findFirstScheduleForDoctor(workSchedule.fromDoctor(dr0), begin, dates0, absence);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 17, 16, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstScheduleOperationTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-15 08:00");
			
			dr2.setThursday(Shift.NONE);
			dates2.remove(3);
			dates2.remove(2);
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 17, 16, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstEqualShiftOperation2Test() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-17 08:00");
			
			dr2.setFriday(Shift.NONE);
			dr1.setFriday(Shift.NONE);
			dr0.setFriday(Shift.NONE);
			dr0.setMonday(Shift.FIRST);
			dr1.setMonday(Shift.FIRST);
			dr2.setMonday(Shift.FIRST);
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 20, 8, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstEqualShiftOperation3Test() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-17 08:00");
			
			dr2.setFriday(Shift.NONE);
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 23, 16, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstEqualShiftOperation4Test() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-16 08:00");
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 22, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstEqualShiftOperation5Test() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-13 08:00");
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 22, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void FindFirstEqualShiftOperation6Test() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin = dateConverter.stringToDate("2020-01-12 08:00");
			
			dates0.remove(dates0.size()-1);
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 21, 20, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void SkipDayOperationTest() throws ParseException {
		try {
			Calendar begin = Calendar.getInstance();
			begin.set(2020, 0, 13, 12, 30, 0);
			begin.set(Calendar.MILLISECOND, 0);
			
			dr0.setMonday(Shift.FIRST);
			dr1.setMonday(Shift.FIRST);
			dr2.setMonday(Shift.FIRST);
			
			Calendar newDate  = Calendar.getInstance();
			newDate.set(2020, 0, 13, 14, 10, 0);
			newDate.set(Calendar.MILLISECOND, 0);
			dates0.add(2, newDate.getTime());
			
			Calendar finded;
			finded = calculate.findFirstScheduleForOperation(dr0, dr1, dr2, dates0, dates1, dates2, null, null, null, begin);
		
			Calendar expected = Calendar.getInstance();
			expected.set(2020, 0, 16, 22, 0, 0);
			expected.set(Calendar.MILLISECOND, 0);
			
			assertEquals(expected, finded);
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
}
