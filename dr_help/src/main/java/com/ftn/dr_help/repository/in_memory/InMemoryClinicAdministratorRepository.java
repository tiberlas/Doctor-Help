package com.ftn.dr_help.repository.in_memory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.ftn.dr_help.model.pojo.ClinicAdministratorPOJO;
import com.ftn.dr_help.repository.ClinicAdministratorRepository;

@Repository("InMemoryClinicAdmin")
public class InMemoryClinicAdministratorRepository implements ClinicAdministratorRepository {

	private ClinicAdministratorPOJO admin;

	public InMemoryClinicAdministratorRepository() {
		admin = new ClinicAdministratorPOJO();
		admin.setId(25L);
		admin.setFirstName("imenko");
		admin.setLastName("prezimenic");
	}
	
	@Override
	public List<ClinicAdministratorPOJO> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ClinicAdministratorPOJO> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ClinicAdministratorPOJO> findAllById(Iterable<Long> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends ClinicAdministratorPOJO> S saveAndFlush(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteInBatch(Iterable<ClinicAdministratorPOJO> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAllInBatch() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ClinicAdministratorPOJO getOne(Long id) {
		// TODO Auto-generated method stub
		if(id == 25)
			return admin;
		else 
			return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<ClinicAdministratorPOJO> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> S save(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<ClinicAdministratorPOJO> findById(Long id) {
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
	public void delete(ClinicAdministratorPOJO entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll(Iterable<? extends ClinicAdministratorPOJO> entities) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <S extends ClinicAdministratorPOJO> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends ClinicAdministratorPOJO> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}
	
	

}
