package com.ftn.dr_help.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage {
	
	private WebDriver driver;

	  public LoginPage(WebDriver driver) {
	        this.driver = driver;
	    }
	  
	  public WebElement getEmailForm() {
		  return driver.findElement(By.id("tb_email"));
	  }
	  
	  public WebElement getPasswordForm() {
		  return driver.findElement(By.id("tb_password"));
	  }
}
