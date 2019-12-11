package com.ftn.dr_help;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages={"com.ftn.dr_help"})
public class DrHelpApplication {

	public static void main(String[] args) {
		SpringApplication.run(DrHelpApplication.class, args);
		System.out.println("HELLO DR HELP");
		
	}

}
