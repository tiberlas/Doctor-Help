insert into clinic(address, name, description) values('gospodnja 11', 'KLINIKA ZDRAVOG UMA', 'KLINIKA JE NAMENJENA ZA ...');

--password: sifra
insert into centre_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday) 
	values(
		'DJURA','DJURIC', '$2y$10$.LtaQ8h1eF5Y9mz7cZwTqeXf0TyGRLbyOD27/eRb4N9WMuOZHwYMG', 'CENTRE_ADMINISTRATOR', 'glavni@sef',
		 '06*-555-555', 'RS', 'NS', 'A DOM', '2003-2-1'::timestamp
	);

--password: 1234
insert into clinic_administrator(first_name, last_name, password, status, email, phone_number, state, city, address, birthday, clinic_id) 
	values(
		'BORISLAV','BORISAVLJEVIC', '$2y$10$5ozpUNr/gCI4YGtih/eSiuWZ6C8L6FLlt4sGuJJbkbD0WxCQe3Mqe', 'CLINICAL_ADMINISTRATOR', 
		'admin@admin', '06*-555-555', 'RS', 'NS', 'DOM', '2003-2-1'::timestamp, 1 
	);

--password: maxBezbedno
insert into clinic_administrator (address, birthday, city, email, first_name, last_name, "password", phone_number, status, state, clinic_id) 
	values (
		'Stevana Milovanova 6', '1967-05-17', 'Novi Sad', 'mikiveliki@yahoo.com', 'Milorad', 'Vuckovic', 
		'$2y$10$OjRFtBABOOg/9fL4iQHqjeJ/PGK/b0xJDW10/XwO8urdDbXhKJ7sm', '860415301', 'CLINICAL_ADMINISTRATOR', 'Serbia', '1'
	);