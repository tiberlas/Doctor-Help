package com.ftn.dr_help.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import com.ftn.dr_help.dto.LoginRequestDTO;
import com.ftn.dr_help.dto.LoginResponseDTO;
import com.ftn.dr_help.dto.RequestingAppointmentDTO;
import com.ftn.dr_help.service.AppointmentService;

import constants.AppointmentConstants;
import constants.UserConstants;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class AppointmentControllerGetPredefinedTest {

	@Autowired
    private TestRestTemplate restTemplate;
	
	private String accessToken;
	
	private MockMvc mockMvc;
	
	@MockBean
	private AppointmentService appointmentService;
	
	private List<RequestingAppointmentDTO> requests = new ArrayList<>();
	
	@Autowired
    private WebApplicationContext webApplicationContext;
	
	private MediaType contentType = new MediaType(
			MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));
	
	@PostConstruct
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }
	
	@Before
	public void login() {
		ResponseEntity<LoginResponseDTO> responseEntity = 
				restTemplate.postForEntity(UserConstants.LOGIN_URL, 
						new LoginRequestDTO(UserConstants.CLINIC_ADMIN_MAIL, UserConstants.CLINIC_ADMIN_PASSWORD), 
						LoginResponseDTO.class);
		accessToken = "Bearer "+responseEntity.getBody().getJwtToken();
		
		
		RequestingAppointmentDTO newAppointemnt = new RequestingAppointmentDTO(
				1L, 
				"01/25/2020 10:30 AM", 
				"transplatacija jetre", 
				"dr Bozidar", 
				"sestra Milunka", 
				"Kunic", 
				25L, 
				"02:00");
		requests.add(newAppointemnt);
	}
	
	@Test
	public void smokeTestNotFound() {
		try {

			mockMvc.perform(get("api/appointments/requests/all")
					.contentType(contentType)
					.header("Authorization", accessToken))
				    .andExpect(status().isNotFound());
			
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void smokeTestOK() {
		try {

			Mockito.when(
					appointmentService.getAllRequests(
							Mockito.any(String.class))
					).thenReturn(requests);
			
			mockMvc.perform(get("/api/appointments/requests/all")
					.contentType(contentType)
					.header("Authorization", accessToken))
				    .andExpect(status().isOk());
			
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
	@Test
	public void test() {
		Mockito.when(appointmentService.getAllRequests("test@mail")).thenReturn(requests);
		
		try {
			
			this.mockMvc.perform(get("api/appointments/requests/all")
					.contentType(contentType)
					.header("Authorization", accessToken))
			.andDo(print())
			.andExpect(status()
					.isOk())
			.andExpect(content().contentType(contentType))
			//.andExpect(jsonPath("$").value(hasSize(LIST_AVAILABLE_DOCTORS_COUNT)))
            .andExpect(jsonPath("$.[*].id").value(1l))
            .andExpect(jsonPath("$.[*].id").value(hasItem(NEW_DOCTOR_2_ID.intValue())));
					
//					andExpect(content().json("[{"
//					+ "\"id\": 1"
//					+ "\"date\": \"01/25/2020 10:30 AM\""
//					+ "\"type\": \"transplatacija jetre\""
//					+ "\"doctor\": \"dr Bozidar\""
//					+ "\"nurse\": \"sestra Milunka\""
//					+ "\"patient\": \"Kunic\""
//					+ "\"typeId\": 25"
//					+ "\"duration\": \"02:00\""
//					+ "}]"));
			
		} catch (Exception e) {
			e.printStackTrace();
			fail();
		}
	}
	
}
