

CREATE TABLE IF NOT EXISTS users (
	ID UUID PRIMARY KEY NOT NULL,
	first_name VARCHAR(45) NOT NULL,
	last_name VARCHAR(45) NOT NULL,
	email VARCHAR(60) NOT NULL,
	password VARCHAR NOT NULL,
	role VARCHAR(40) NOT NULL
		CONSTRAINT CK_users_role CHECK (role IN ('user', 'employer', 'admin')),
	confirmed boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS confirmation_emails (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    status boolean NOT NULL,
    time_stamp timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users_bio (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    phone VARCHAR(60) NOT NULL,
    address_main VARCHAR(60) NOT NULL,
    address_city VARCHAR(60) NOT NULL,
    address_zip VARCHAR(60) NOT NULL,
    address_country VARCHAR(60) NOT NULL,
    date_birth VARCHAR(60) NOT NULL,
    gender VARCHAR(30) NOT NULL
);
