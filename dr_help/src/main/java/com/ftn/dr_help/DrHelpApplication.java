package com.ftn.dr_help;

import java.text.ParseException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;



@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages={"com.ftn.dr_help"})
@EnableTransactionManagement
@EnableAsync
@EnableJpaRepositories
public class DrHelpApplication {

	public static void main(String[] args) throws ParseException {
		SpringApplication.run(DrHelpApplication.class, args);
		System.out.println("HELLO DR HELP");
	}

}
 