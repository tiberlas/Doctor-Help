package com.ftn.dr_help.selenium;

import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import com.ftn.dr_help.selenium.pages.LoginPage;

public class ReservePredefinedTest {

	private WebDriver browser;
	
	private LoginPage loginPage;
	
	@BeforeMethod
	public void setUp() {
		System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver");
        browser = new ChromeDriver();
        
        browser.manage().window().maximize();
        
        loginPage = PageFactory.initElements(browser, LoginPage.class);
	}
	
	@Test
	public void testLogin() {
		browser.get("http://localhost:3000/login");
		
		WebElement loginForm = loginPage.getEmailForm();
		loginForm.click();
		loginForm.sendKeys("happymeal@gmail.com");
		
		WebElement passwordForm = loginPage.getPasswordForm();
		passwordForm.sendKeys("whoppa42");
		
	}
	
	
	@AfterMethod
    public void tearDown() {
        browser.close();
    }
}
