package com.ftn.dr_help.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.testng.annotations.BeforeMethod;
import org.junit.Test;

import com.ftn.dr_help.selenium.pages.LoginPage;


public class BlessAppointmentsTest {

	private WebDriver browser;
	
	private LoginPage loginPage;
	
	@BeforeMethod
    public void setUp() {
        //instantiate chrome browser
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        browser = new ChromeDriver();
        
        //maximize window
        browser.manage().window().maximize();

        //navigate
        browser.navigate().to("http://localhost:3000/login");

        loginPage = PageFactory.initElements(browser, LoginPage.class);
    }
	
	@Test
    public void login() {
		WebElement emailForm = loginPage.getLoginEmailForm();
		emailForm.click();
		emailForm.sendKeys("admin@admin");
		
		WebElement passwordForm = loginPage.getLoginPasswordForm();
		passwordForm.click();
		passwordForm.sendKeys("1234");
		
		WebElement submit = loginPage.getLoginSubmit();
		submit.click();
	}
}
