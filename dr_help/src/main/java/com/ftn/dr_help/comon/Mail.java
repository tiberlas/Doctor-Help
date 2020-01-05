package com.ftn.dr_help.comon;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
        text += "An account has been linked to this email address. Your sign in credentials are: ";
        text += "\n\n\nEmail:\t" + sendTo;
        text += "\nPassword:\t" + password;
        
        if(role.equals(RoleEnum.CENTRE_ADMINISTRATOR)) {
        	text += "\nAppointed role:\tCentre administrator";
        } else if(role.equals(RoleEnum.CLINICAL_ADMINISTRATOR)) {
        	text += "\nAppointed role:\tClinic administrator";
        } else if(role.equals(RoleEnum.DOCTOR)) {
        	text += "\nAppointed role:\tDoctor";
        } else if(role.equals(RoleEnum.NURSE)) {
        	text += "\nAppointed role:\tNurse";
        }
        
        text += "\nPlease, change your password after logging in. \n" + "Forever helping, drHelp.";
        msg.setText(text);

        javaMailSender.send(msg);

    }
	
	
	
	public void sendAcceptEmail(String sendTo, String firstName, String lastName) throws MessagingException, IOException  {
		
		MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(sendTo);

        helper.setSubject("DrHelp account registration");
        String text = "Dear " + firstName + " " + lastName + "," + '\n';
        text += "your account request has been reviewed and accepted by our administrator staff. \n Please follow the link below to activate your account.";
        text += "http://localhost:3000/activate=" + sendTo + "\n\n\n" + "Forever helping, drHelp.";
        helper.setText(text);

       javaMailSender.send(msg);
	
}


	public void sendDeclineEmail(String sendTo, String description, String firstName, String lastName) {

	    SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(sendTo);
	
	    msg.setSubject("DrHelp account registration");
	    String text = "Dear " + firstName + " " + lastName + "," + '\n';
	    text += "your account request has been reviewed. Unfortunately, it has been declined, with an administrator message attached:";
	    text += "\n\n\n" + description;
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);

}
	
}
