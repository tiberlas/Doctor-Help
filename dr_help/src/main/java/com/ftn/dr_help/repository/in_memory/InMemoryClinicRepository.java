package com.ftn.dr_help.repository.in_memory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.ClinicPOJO;
import com.ftn.dr_help.model.pojo.RoomPOJO;
import com.ftn.dr_help.repository.ClinicRepositorium;

@Repository("InMemoryClinicRepository")
public class InMemoryClinicRepository implements ClinicRepositorium{

	private ClinicPOJO clinic;
	
	public InMemoryClinicRepository() {
		RoomPOJO r1 = new RoomPOJO();
		r1.setId(2L);
		r1.setName("kardio");
		r1.setNumber(2);
		
		RoomPOJO r2 = new RoomPOJO();
		r2.setId(3L);
		r2.setName("kardio");
		r2.setNumber(6);
		
		ArrayList<RoomPOJO> roomList = new ArrayList<RoomPOJO>();
		roomList.add(r1);
		roomList.add(r2);
		
		clinic = new ClinicPOJO();
		clinic.setId(30L);
		clinic.setRoomList(roomList);
	}
	
	@Override
	public List<ClinicPOJO> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ClinicPOJO> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ClinicPOJO> findAllById(Iterable<Long> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicPOJO> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends ClinicPOJO> S saveAndFlush(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteInBatch(Iterable<ClinicPOJO> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllInBatch() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ClinicPOJO getOne(Long id) {
		if(id == 30)
			return clinic;
		else 
			return null;
	}

	@Override
	public <S extends ClinicPOJO> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicPOJO> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<ClinicPOJO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicPOJO> S save(S entity) {
		clinic.setName(entity.getName());
		clinic.setAddress(entity.getAddress());
		clinic.setDescription(entity.getDescription());
		return (S) clinic;
	}

	@Override
	public Optional<ClinicPOJO> findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(ClinicPOJO entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll(Iterable<? extends ClinicPOJO> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends ClinicPOJO> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicPOJO> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicPOJO> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends ClinicPOJO> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}

}
