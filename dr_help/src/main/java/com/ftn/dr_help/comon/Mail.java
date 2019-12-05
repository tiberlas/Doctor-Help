package com.ftn.dr_help.comon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.RoleEnum;

@Service
public class Mail {

	@Autowired 
	private JavaMailSender javaMailSender;
	
	public void sendAccountInfoEmail(String sendTo, String password, String firstName, String lastName, RoleEnum role) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(sendTo);

        msg.setSubject("DrHelp account registration");
        String text = "Dear " + firstName + " " + lastName + ","+'\n';
        text += "An account has been linked to this email address. Your login credentials are: ";
        text += "\n\n\nEmail:\t" + sendTo;
        text += "\nPassword:\t" + password;
        
        if(role.equals(RoleEnum.CENTRE_ADMINISTRATOR)) {
        	text += "\nYour role:\tCentre administrator";
        } else if(role.equals(RoleEnum.CLINICAL_ADMINISTRATOR)) {
        	text += "\nYourRole:\tClinic administrator";
        }
        
        text += "\nPlease, change your password after logging in. \n" + "Forever helping, drHelp.";
        msg.setText(text);

        javaMailSender.send(msg);

    }
	
}
