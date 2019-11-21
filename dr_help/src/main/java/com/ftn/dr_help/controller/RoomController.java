package com.ftn.dr_help.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftn.dr_help.dto.RoomDTO;
import com.ftn.dr_help.service.RoomService;

@RestController
@RequestMapping(value = "api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {
	
	@Autowired
	private RoomService service;
	
	@GetMapping(value = "/clinic={clinic_id}/all")
	public ResponseEntity<List<RoomDTO>> getAllRooms(@PathVariable("clinic_id") Long clinic_id) {
		List<RoomDTO> finded = service.findAll(clinic_id);
		
		if(finded == null || finded.isEmpty())
			return new ResponseEntity<List<RoomDTO>>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<List<RoomDTO>>(finded,  HttpStatus.OK);
	}
	
	@GetMapping(value = "/clinic={clinic_id}/one/room={room_id}")
	public ResponseEntity<RoomDTO> getOneRooms(@PathVariable("clinic_id") Long clinic_id, @PathVariable("room_id") Long room_id) {
		RoomDTO finded = service.findOne(clinic_id, room_id);
		
		if(finded == null)
			return new ResponseEntity<RoomDTO>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<RoomDTO>(finded,  HttpStatus.OK);
	}

}
