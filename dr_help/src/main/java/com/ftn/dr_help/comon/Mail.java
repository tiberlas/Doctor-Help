package com.ftn.dr_help.comon;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.ftn.dr_help.model.enums.RoleEnum;
import com.ftn.dr_help.model.pojo.AppointmentPOJO;
import com.ftn.dr_help.model.pojo.DoctorPOJO;
import com.ftn.dr_help.model.pojo.OperationPOJO;

@Service
public class Mail {

	@Autowired 
	private JavaMailSender javaMailSender;
	
	@Autowired
	private DateConverter dateConvertor;
	
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
	
	public void sendAppointmentRequestEmail(String sendTo, String doctorName, String type, String date) {

	    SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(sendTo);
	
	    msg.setSubject("DrHelp request appointment");
	    String text = "Dr " + doctorName + " request an appointment for " + type;
	    text += " at " + date;
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}
	
	public void sendOperationRequestEmail(String sendTo, String requestingDoctorName, String dr0Name, String dr1Name, String dr2Name, String type, String date) {

	    SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(sendTo);
	
	    msg.setSubject("DrHelp request operation");
	    String text = "Dr " + requestingDoctorName + " request an operation for " + type;
	    text += " at " + date;
	    text += " with dr " + dr0Name + ", dr " + dr1Name + "and dr " + dr2Name;
	    
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}
	
	@Async
	public void sendAppointmentBlessedEmail(AppointmentPOJO appointment) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(appointment.getPatient().getEmail());
	
	    msg.setSubject("DrHelp requesting appointment");
	    String text = "Dear " + appointment.getPatient().getFirstName() +" "+appointment.getPatient().getLastName()+ 
	    		" your appointemnt for " +appointment.getProcedureType().getName()+" has been schedule for "+
	    		dateConvertor.dateForFrontEndString(appointment.getDate())+", in room "+
	    		appointment.getRoom().getName()+" number "+appointment.getRoom().getNumber()+
	    		". Dr "+appointment.getDoctor().getFirstName()+
	    		" "+appointment.getDoctor().getLastName()+" will examin you.";
	    
	    //NIKOLA OVDE TI DODAS LINK KA ODOBRAVANJU PREGLEDA
	    
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}
	
	@Async
	public void sendAppointmentApprovedToPatientEmail(AppointmentPOJO appointment) {
			
			SimpleMailMessage msg = new SimpleMailMessage();
		    msg.setTo(appointment.getPatient().getEmail());
		
		    msg.setSubject("DrHelp appointment check");
		    String text = "Dear " + appointment.getPatient().getFirstName() +" "+appointment.getPatient().getLastName()+ 
		    		" your appointemnt for " +appointment.getProcedureType().getName()+" has been schedule for "+
		    		dateConvertor.dateForFrontEndString(appointment.getDate())+", in room "+
		    		appointment.getRoom().getName()+" number "+appointment.getRoom().getNumber()+
		    		". Dr "+appointment.getDoctor().getFirstName()+
		    		" "+appointment.getDoctor().getLastName()+" will examin you.";
		    
		    text += "\n\n\n" + "Forever helping, drHelp.";
		    msg.setText(text);
		
		    javaMailSender.send(msg);
	}
	
	@Async
	public void sendAppointmentApprovedToDoctorEmail(AppointmentPOJO appointment) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(appointment.getDoctor().getEmail());
	
	    msg.setSubject("DrHelp appointment check");
	    String text = "Dear dr " + appointment.getDoctor().getFirstName() +" "+appointment.getDoctor().getLastName()+ 
	    		" your appointemnt for patient "+appointment.getPatient().getFirstName()+" "+appointment.getPatient().getLastName()+
	    		" has been scheduled for "+dateConvertor.dateForFrontEndString(appointment.getDate())+", in room "+
			    appointment.getRoom().getName()+" number "+appointment.getRoom().getNumber();
	    
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}

	@Async
	public void sendAppointmentApprovedToNurseEmail(AppointmentPOJO appointment) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(appointment.getNurse().getEmail());
	
	    msg.setSubject("DrHelp appointment reserved");
	    String text = "Dear " + appointment.getNurse().getFirstName() +" "+appointment.getNurse().getLastName()+ 
	    		" you have an appointemnt on "+
	    		dateConvertor.dateForFrontEndString(appointment.getDate())+", in room "+
			    appointment.getRoom().getName()+" number "+appointment.getRoom().getNumber();
	    
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}
	
	@Async
	public void sendOperationApprovedToDoctorsEmail(DoctorPOJO doctor, OperationPOJO operation) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
	    msg.setTo(doctor.getEmail());
	
	    msg.setSubject("DrHelp operation scheduled");
	    String text = "Dear " + doctor.getFirstName() +" "+doctor.getLastName()+ 
	    		" you have an operation on "+
	    		dateConvertor.dateForFrontEndString(operation.getDate())+", in room "+
			    operation.getRoom().getName()+" number "+operation.getRoom().getNumber();
	    
	    text += "\n\n\n" + "Forever helping, drHelp.";
	    msg.setText(text);
	
	    javaMailSender.send(msg);
	}
	
	@Async
	public void sendOperationApprovedToPatientEmail(OperationPOJO operation) {
			
			SimpleMailMessage msg = new SimpleMailMessage();
		    msg.setTo(operation.getPatient().getEmail());
		
		    msg.setSubject("DrHelp operation scheduled");
		    String text = "Dear " + operation.getPatient().getFirstName() +" "+operation.getPatient().getLastName()+ 
		    		" your operation for " +operation.getOperationType().getName()+" has been schedule for "+
		    		dateConvertor.dateForFrontEndString(operation.getDate())+", in room "+
		    		operation.getRoom().getName()+" number "+operation.getRoom().getNumber()+
		    		". Operation will be executed by dr. "+operation.getFirstDoctor().getFirstName()+" "+operation.getFirstDoctor().getLastName()+
		    		", dr. "+operation.getSecondDoctor().getFirstName()+" "+operation.getSecondDoctor().getLastName()+
		    		" and dr. "+operation.getThirdDoctor().getFirstName()+" "+operation.getThirdDoctor().getLastName()+".";
		    
		    text += "\n\n\n" + "Forever helping, drHelp.";
		    msg.setText(text);
		
		    javaMailSender.send(msg);
	}
	
}
