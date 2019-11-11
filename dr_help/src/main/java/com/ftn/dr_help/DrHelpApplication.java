package com.ftn.dr_help;

import java.util.Calendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.service.ClinicAdministratorService;

@SpringBootApplication
public class DrHelpApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrHelpApplication.class, args);
		System.out.println("HELLO DR HELP");
		//test();
	}
	
	private static void test() {
		ClinicAdministratorPOJO c = new ClinicAdministratorPOJO("password1", "mika@email.com", "Mika", "Peric", "Bul smrti 1", "Novi Sad", "Serbia", "0643312351", RoleEnum.CLINICAL_ADMINISTRATOR, Calendar.getInstance());
		ClinicAdministratorService s = new ClinicAdministratorService();
		s.save(c);
		System.out.println(s.findAll());
	}

}
