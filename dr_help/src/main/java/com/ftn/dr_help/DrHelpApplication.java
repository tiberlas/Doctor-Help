package com.ftn.dr_help;

import java.text.ParseException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.ftn.dr_help.comon.DailySchedule;


@SpringBootApplication
@ComponentScan(basePackages={"com.ftn.dr_help"})
public class DrHelpApplication {

	public static void main(String[] args) throws ParseException {
		SpringApplication.run(DrHelpApplication.class, args);
		System.out.println("HELLO DR HELP");
	}

}
