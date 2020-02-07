--SQL skripta koja se pokrece sa Spring boot app i daje dummy podatke
-- enkripcija sa sajta: https://bcrypt-generator.com/

insert into clinic(address, city, state, name, description) values('7A Bulevar despota Stefana', 'Novi Sad', 'Serbia', 'Klinika zdravog uma', 'Klinika je namenjena za kreativne opise. ');
insert into clinic(address, city, state, name, description) values('7 Bulevar despota Stefana', 'Novi Sad', 'Serbia', 'Arkham', 'Assylum for the criminally insane.');
insert into clinic(address, city, state, name, description) values('5A Bulevar despota Stefana', 'Novi Sad', 'Serbia', 'Princeton Plainsborrough general hospital', 'Free, publically open clinic.');
insert into clinic(address, city, state, name, description) values('2A Bulevar despota Stefana', 'Novi Sad', 'Serbia', 'Nasa Mala Klinika', 'Mali svet pun radosti.');
insert into clinic(address, city, state, name, description) values('2A Bulevar despota Stefana', 'Podgorica', 'Montenegro', 'Nasa Mala Klinika', 'Mali svet pun radosti.');

--password: sifra
insert into centre_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday) 
	values(
		'Đura','Đurić', '$2y$10$.LtaQ8h1eF5Y9mz7cZwTqeXf0TyGRLbyOD27/eRb4N9WMuOZHwYMG', 'CENTRE_ADMINISTRATOR', 'glavni@sef',
		 '06555555', 'Serbia', 'Novi Sad', 'A dom', '2003-2-1'::timestamp
	);

	 
--password: 1234
insert into clinic_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'Borislav','Borisavljević', '$2y$10$5ozpUNr/gCI4YGtih/eSiuWZ6C8L6FLlt4sGuJJbkbD0WxCQe3Mqe', 'CLINICAL_ADMINISTRATOR', 
		'admin@admin', '06555555', 'Serbia', 'Novi Sad', 'Dom Kulture', '2003-2-1'::timestamp, 1 
	);

--password: maxBezbedno
insert into clinic_administrator (address, birthday, city, email, first_name, last_name, password, phone_number, status, state, clinic_id) 
	values (
		'Stevana Milovanova 6', '1967-05-17', 'Novi Sad', 'mikiveliki@yahoo.com', 'Milorad', 'Vucković', 
		'$2y$10$OjRFtBABOOg/9fL4iQHqjeJ/PGK/b0xJDW10/XwO8urdDbXhKJ7sm', '860415301', 'CLINICAL_ADMINISTRATOR', 'Serbia', '1'
	);
	

--password: whoppa42
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, password, phone_number, status, state, health_record_id
) values (
	'Bajić i Vlahović soba 11', '1998-07-21', 'Novi Sad', 'happymeal@gmail.com', 'Tanja', 434, true, 'Blejić', 
	'$2y$10$ILLsTus2GDQ7735uE36xd.g89zdP.QXDqYTYSznl9XGZlQ5EQUFBy', '06216684654', 'PATIENT', 'Serbia', null
);
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, password, phone_number, status, state, health_record_id
) values (
	'Grobljanska 5', '1983-11-12', 'Beograd', 'gmail@gmail.com', 'Borislav', 433, true, 'Rašeta', 
	'$2y$10$ILLsTus2GDQ7735uE36xd.g89zdP.QXDqYTYSznl9XGZlQ5EQUFBy', '0656152164', 'PATIENT', 'Serbia', null
);
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, password, phone_number, status, state, health_record_id
) values (
	'Brace Ribnikar 16a', '1987-01-23', 'Novi Sad', 'digimon@gmail.com', 'Milivoje', 43223, true, 'Radulović', 
	'$2y$10$ILLsTus2GDQ7735uE36xd.g89zdP.QXDqYTYSznl9XGZlQ5EQUFBy', '0656152164', 'PATIENT', 'Serbia', null
);
--password: imejl
insert into patiens (
address, birthday, city, email, first_name, insurance_number, is_activated, last_name, password, phone_number, status, state, health_record_id
) values (
	'Stevana Milovanova 17', '1985-03-29', 'Novi Sad', 'enekadresa@gmail.com', 'Jovan', 123321, false, 'Matic', 
	'$2y$10$vjb/stdBU46vh74lsuHoWuIjYcDCwqpESS3I2ukf0C07p6AfNcvl2', '860484061105', 'PATIENT', 'Serbia', null
);

	
	
--password: 1234
insert into nurse(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
values(
	'Ana', 'Anica', '$2y$10$xF3sVXDDtuqCmpL2aI7pK.4/qJYA7r/vlmIIONs5XDfEwTqCLRIHe', 'NURSE', 'ana@gmail', '555555', 
	'Serbia', 'Novi Sad', 'Ulica 8', '2003-2-1'::timestamp, 1, false, 'NONE', 'FIRST', 'SECOND', 'THIRD', 'NONE', 'NONE', 'NONE'
);
--password: 1234
insert into nurse(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
values(
	'Mila', 'Milić', '$2y$10$xF3sVXDDtuqCmpL2aI7pK.4/qJYA7r/vlmIIONs5XDfEwTqCLRIHe', 'NURSE', 'mila@gmail', '555555', 
	'Srbija', 'Novi Sad', 'Jovana Petrovica 9', '2003-2-1'::timestamp, 1, false, 'FIRST', 'SECOND', 'THIRD', 'NONE', 'NONE', 'NONE', 'NONE'
);


insert into procedures_type(name, price, is_operation, duration, clinic_id, deleted) 
values('psiho analiza', 255, false, '01:00:00'::time, 1, false);
insert into procedures_type(name, price, is_operation, duration, clinic_id, deleted) 
values('opsti pregled', 25, false, '00:30:00'::time, 1, false);
insert into procedures_type(duration, is_operation, name, price, clinic_id, deleted) 
values ('01:00:00', false, 'Pregled opste prakse', 330, 3, false);
insert into procedures_type(duration, is_operation, name, price, clinic_id, deleted) 
values ('01:00:00', false, 'Pregled opste prakse', 350, 2, false);
insert into procedures_type(duration, is_operation, name, price, clinic_id, deleted) 
values ('01:15:00', false, 'Pregled opste prakse', 250, 1, false);
insert into procedures_type(duration, is_operation, name, price, clinic_id, deleted) 
values ('02:00:00', false, 'Pregled dermatologa', 630, 2, false);
insert into procedures_type(duration, is_operation, name, price, clinic_id, deleted) 
values ('06:00:00', true, 'Lobotomija', 2200, 1, false);
	
--password: doca 	
insert into doctors(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id, procedure_type_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
values(
	'Pera', 'Perić', '$2y$10$6NDf1Bm3cHFYdZEJwUE9MOrr6CZOSTqrvqvTTkXETVy18yr8eZuGe', 'DOCTOR', 'pera@gmail', '555555', 
	'Serbia', 'Novi Sad', 'Pap Pavla 3', '2003-2-1'::timestamp, 1, 1, false, 'FIRST', 'SECOND', 'THIRD', 'NONE', 'NONE', 'NONE', 'NONE'
);
insert into doctors(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id, procedure_type_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
values(
	'Jovan', 'Milinković', '$2y$10$6NDf1Bm3cHFYdZEJwUE9MOrr6CZOSTqrvqvTTkXETVy18yr8eZuGe', 'DOCTOR', 'j.milinkovic@gmail', '555556', 
	'Serbia', 'Novi Sad', 'Pere Milića 3', '2001-3-15'::timestamp, 1, 2, false, 'NONE', 'FIRST', 'SECOND', 'THIRD', 'NONE', 'NONE', 'NONE'
);
insert into doctors(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id, procedure_type_id, deleted, monday, tuesday, wednesday, thursday, friday, saturday, sunday) 
values(
	'Đorđe', 'Bogdanović', '$2y$10$6NDf1Bm3cHFYdZEJwUE9MOrr6CZOSTqrvqvTTkXETVy18yr8eZuGe', 'DOCTOR', 'djokica@gmail', '555557', 
	'Serbia', 'Novi Sad', 'Narodnih heroja 13', '1994-7-19'::timestamp, 1, 1, false, 'NONE', 'FIRST', 'SECOND', 'THIRD', 'NONE', 'NONE', 'NONE'
);

insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('Psihoterapija', 25, false, 1, 1);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('Opšta A', 30, false, 1, 2);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('Opšta B', 31, false, 1, 2);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('OPERACIONA SALA', 101, false, 1, 7);
insert into room(name, number, deleted, clinic_id, proceduras_types_id) 
	values('OPERACIONA SALA', 102, false, 1, 7);		
	

