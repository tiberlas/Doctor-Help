package com.ftn.dr_help.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping (value = "api/perscriptions")
public class PerscriptionService {

	@Autowired
	private PerscriptionService perscriptionService;
	
}
