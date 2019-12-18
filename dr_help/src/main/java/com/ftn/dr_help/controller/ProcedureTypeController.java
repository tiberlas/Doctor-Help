package com.ftn.dr_help.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

import com.ftn.dr_help.comon.CurrentUser;
import com.ftn.dr_help.dto.ProcedureTypeDTO;
import com.ftn.dr_help.service.ProcedureTypeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/procedure+types")
public class ProcedureTypeController {

    @Autowired
	private ProcedureTypeService procedureTypeService;
	
	@Autowired
    private CurrentUser currentUser;
    
    @GetMapping(value = "/all")
    public ResponseEntity<List<ProcedureTypeDTO>> getAll() {
        List<ProcedureTypeDTO> ret = procedureTypeService.getAll();

        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @GetMapping(value = "/id={id}")
    public ResponseEntity<ProcedureTypeDTO> getOne(@PathVariable("id") Long id) {
        ProcedureTypeDTO ret = null;

        ret = procedureTypeService.getOne(id);

        if(ret == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @PostMapping(value = "/new+procedure+type", consumes = "application/json")
    @PreAuthorize("hasAuthority('CLINICAL_ADMINISTRATOR')")
    public ResponseEntity<ProcedureTypeDTO> save(@RequestBody ProcedureTypeDTO newProcedureType) {
        String email = currentUser.getEmail();
		
		ProcedureTypeDTO saved = procedureTypeService.saveNew(newProcedureType, email);
		
		if(saved == null) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }


}