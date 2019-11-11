package com.ftn.dr_help;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.CentreAdministratorPOJO;
import com.ftn.dr_help.service.CenterAdministratorService;

@SpringBootApplication
public class DrHelpApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrHelpApplication.class, args);
		System.out.println("HELLO DR HELP");
		
		CentreAdministratorPOJO test = new CentreAdministratorPOJO("1234", "sdas", "dsa", "sad", "sda", "wea", "dsads", "dsad", RoleEnum.CENTRE_ADMINISTRATOR, Calendar.getInstance());
		
		CenterAdministratorService service = new CenterAdministratorService();
		
		
		service.save(test);
		System.out.println(service.findAll());
		
	}

}
