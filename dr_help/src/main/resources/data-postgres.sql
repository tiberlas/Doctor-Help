--SQL skripta koja se pokrece sa Spring boot app i daje dummy podatke
-- enkripcija sa sajta: https://bcrypt-generator.com/

insert into clinic(address, name, description) values('gospodnja 11', 'KLINIKA ZDRAVOG UMA', 'KLINIKA JE NAMENJENA ZA ...');
insert into clinic(address, name, description) values('22 Dunnich Lane', 'Arkham', 'Assylum for the criminally insane');
insert into clinic(address, name, description) values('24 Plainsburrough', 'Princeton Plainsborrough general hospital', 'Free, publically open clinic');
insert into clinic(address, name, description) values('Ulica gradska', 'Nasa Mala Klinika', 'Mali svet pun radosti');

--password: sifra
insert into centre_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday) 
	values(
		'DJURA','DJURIC', '$2y$10$.LtaQ8h1eF5Y9mz7cZwTqeXf0TyGRLbyOD27/eRb4N9WMuOZHwYMG', 'CENTRE_ADMINISTRATOR', 'glavni@sef',
		 '06555555', 'RS', 'NS', 'A DOM', '2003-2-1'::timestamp
	);

	 
--password: 1234
insert into clinic_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'BORISLAV','BORISAVLJEVIC', '$2y$10$5ozpUNr/gCI4YGtih/eSiuWZ6C8L6FLlt4sGuJJbkbD0WxCQe3Mqe', 'CLINICAL_ADMINISTRATOR', 
		'admin@admin', '06555555', 'RS', 'NS', 'DOM', '2003-2-1'::timestamp, 1 
	);

--password: maxBezbedno
insert into clinic_administrator (address, birthday, city, email, first_name, last_name, "password", phone_number, status, state, clinic_id) 
	values (
		'Stevana Milovanova 6', '1967-05-17', 'Novi Sad', 'mikiveliki@yahoo.com', 'Milorad', 'Vuckovic', 
		'$2y$10$OjRFtBABOOg/9fL4iQHqjeJ/PGK/b0xJDW10/XwO8urdDbXhKJ7sm', '860415301', 'CLINICAL_ADMINISTRATOR', 'Serbia', '1'
	);
	

--password: whoppa42
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, "password", phone_number, status, state, health_record_id
) values (
	'Bajic i Vlahovic soba 11', '1998-07-21', 'Novi Sad', 'happymeal@gmail.com', 'Tanja', 434, true, 'Blejic', 
	'$2y$10$ILLsTus2GDQ7735uE36xd.g89zdP.QXDqYTYSznl9XGZlQ5EQUFBy', '06216684654', 'PATIENT', 'Serbia', null
);
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, "password", phone_number, status, state, health_record_id
) values (
	'Grobljanska 5', '1983-11-12', 'Beograd', 'gmail@gmail.com', 'Borislav', 433, true, 'Rašeta', 
	'$2y$10$ILLsTus2GDQ7735uE36xd.g89zdP.QXDqYTYSznl9XGZlQ5EQUFBy', '0656152164', 'PATIENT', 'Serbia', null
);
--password: imejl
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, "password", phone_number, status, state, health_record_id
) values (
	'Stevana Milovanova 17', '1985-03-29', 'Novi Sad', 'enekadresa@gmail.com', 'Jovan', 123321, false, 'Matic', 
	'$2y$10$vjb/stdBU46vh74lsuHoWuIjYcDCwqpESS3I2ukf0C07p6AfNcvl2', '860484061105', 'PATIENT', 'Serbia', null
);

	
	
--password: 1234
insert into nurse(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'ANA', 'ANICA', '$2y$10$xF3sVXDDtuqCmpL2aI7pK.4/qJYA7r/vlmIIONs5XDfEwTqCLRIHe', 'NURSE', 'ana@gmail', '555555', 
		'RS', 'NS', 'ULICA 8', '2003-2-1'::timestamp, 1
	);
--password: 1234
insert into nurse(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'MILA', 'MILIC', '$2y$10$xF3sVXDDtuqCmpL2aI7pK.4/qJYA7r/vlmIIONs5XDfEwTqCLRIHe', 'NURSE', 'mila@gmail', '555555', 
		'RS', 'NS', 'ULICA 8', '2003-2-1'::timestamp, 1
	);
	
--password: doca 	
insert into doctors(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'PERA', 'PERIC', '$2y$10$6NDf1Bm3cHFYdZEJwUE9MOrr6CZOSTqrvqvTTkXETVy18yr8eZuGe', 'DOCTOR', 'pera@gmail', '555555', 
		'RS', 'NS', 'ULICA 8', '2003-2-1'::timestamp, 1
	);

	
insert into precedures_type(name, price, is_operation, duration, clinic_id) 
	values('psiho analiza', 255, false, '02:00:00'::time, 1);
insert into precedures_type(name, price, is_operation, duration, clinic_id) 
	values('opsti pregled', 25, false, '00:30:00'::time, 1);

	
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('PSIHOLOG', 25, false, 1, 1);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('OPSTA A', 30, false, 1, 2);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('OPSTA B', 31, false, 1, 2);

insert into healthrecord (blood_type, diopter, height, weight)
values (
	'A_NEGATIVE', 1.15, 1.75, 73
);
update patiens 
set health_record_id = 1
where patiens.id = 1;

insert into healthrecord (blood_type, diopter, height, weight)
values (
	'O_POSITIVE', -3.2, 1.83, 86
);
update patiens 
set health_record_id = 2
where patiens.id = 2;

insert into allergypojo (allergy, health_record_id)
values ('Nuts', 1);
insert into allergypojo (allergy, health_record_id)
values ('Cats', 1);
insert into allergypojo (allergy, health_record_id)
values ('Pollen', 2);

