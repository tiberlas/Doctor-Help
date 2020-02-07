package com.ftn.dr_help.integration;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.annotation.PostConstruct;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.ftn.dr_help.constants.AppointmentConstants;
import com.ftn.dr_help.constants.LoginConstants;
import com.ftn.dr_help.dto.AppointmentListDTO;
import com.ftn.dr_help.dto.LoginRequestDTO;
import com.ftn.dr_help.dto.LoginResponseDTO;

import constants.UserConstants;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:application-test.properties")
public class AppointmentGetPredefinedIntegrationTest {

	private String accessToken;

    private MediaType contentType = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype());

    private MockMvc mockMvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @PostConstruct
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(springSecurity())
                .build();
    }
    
    @Before
	public void login() throws Exception {
		ResponseEntity<LoginResponseDTO> responseEntity = 
				restTemplate.postForEntity(UserConstants.LOGIN_URL, 
						new LoginRequestDTO(LoginConstants.PATIENT_USERNAME, LoginConstants.PATIENT_PASSWORD), 
						LoginResponseDTO.class);
		accessToken = "Bearer "+ responseEntity.getBody().getJwtToken();
	}
    
    
//    @Test
//	public void getSomeFilteredPredefinedAppointments() throws Exception {
//		
//		mockMvc.perform(get("/api/appointments/predefined/doctor=" + AppointmentConstants.DOCTOR_ID
//				+"/procedure_type="+AppointmentConstants.PROCEDURE_TYPE_ID+"/clinic="
//				+ AppointmentConstants.CLINIC_ID + "/date="+AppointmentConstants.FILTER_DATE)
//				.contentType(contentType)
//				.header("Authorization", accessToken))
//				.andExpect(jsonPath("$.possibleClinics").isArray())
//				.andExpect(jsonPath("$.possibleDoctors").isArray())
//				.andExpect(jsonPath("$.possibleStatuses").isArray())
//				.andExpect(jsonPath("$.possibleTypes").isArray())
//				.andExpect(jsonPath("$.possibleClinics", hasItem(AppointmentConstants.CLINIC_NAME)))
//				.andExpect(jsonPath("$.possibleDoctors", hasItem(AppointmentConstants.DOCTOR_NAME)))
//				.andExpect(jsonPath("$.possibleTypes", hasItem(AppointmentConstants.PROCEDURE_NAME)))
//				.andExpect(jsonPath("$.possibleStatuses", hasItem(AppointmentConstants.STATUS_NAME)))
//				.andExpect(status().isOk());
//		
//	}
}
