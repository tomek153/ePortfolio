CREATE TABLE IF NOT EXISTS work_industry_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS work_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS skill_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS edu_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS edu_spec_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	ID UUID PRIMARY KEY NOT NULL,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(200) NOT NULL,
	password VARCHAR NOT NULL,
	role VARCHAR(40) NOT NULL
		CONSTRAINT CK_users_role CHECK (role IN ('user', 'employer', 'admin')),
	confirmed boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS confirmation_emails (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    status boolean NOT NULL,
    time_stamp timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

CREATE TABLE IF NOT EXISTS users_bio (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    phone VARCHAR(60) NOT NULL,
    address_main VARCHAR(200) NOT NULL,
    address_city VARCHAR(200) NOT NULL,
    address_zip VARCHAR(60) NOT NULL,
    address_country VARCHAR(60) NOT NULL,
    date_birth DATE NOT NULL,
    gender VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

CREATE TABLE IF NOT EXISTS users_setting (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    setting_public BOOLEAN NOT NULL,
    setting_header1 VARCHAR(200) NOT NULL,
    setting_header2 VARCHAR(200) NOT NULL,
    setting_img VARCHAR(90) NOT NULL,
    setting_consent BOOLEAN NOT NULL,
    setting_allow_contact BOOLEAN NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

CREATE TABLE IF NOT EXISTS users_work (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    work_type INTEGER NOT NULL,
    work_name VARCHAR(200) NOT NULL,
    work_time_start DATE NOT NULL,
    work_time_end DATE NOT NULL,
    work_place VARCHAR(200) NOT NULL,
    work_desc VARCHAR(400) NOT NULL,
    work_industry INTEGER NOT NULL,
    work_location VARCHAR(90) NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID),
    FOREIGN KEY (work_industry) REFERENCES work_industry_data (ID),
    FOREIGN KEY (work_type) REFERENCES work_type_data (ID)
);

CREATE TABLE IF NOT EXISTS users_edu (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    edu_type INTEGER NOT NULL,
    edu_name VARCHAR(200) NOT NULL,
    edu_time_start DATE NOT NULL,
    edu_time_end DATE NOT NULL,
    edu_place VARCHAR(200) NOT NULL,
    edu_desc VARCHAR(400) NOT NULL,
    edu_spec INTEGER NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID),
    FOREIGN KEY (edu_spec) REFERENCES edu_spec_data (ID),
    FOREIGN KEY (edu_type) REFERENCES edu_type_data (ID)
);


CREATE TABLE IF NOT EXISTS users_skill (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    skill_type INTEGER NOT NULL,
    skill_name VARCHAR(200) NOT NULL,
    skill_time_months INTEGER NOT NULL,
    skill_level INTEGER NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID),
    FOREIGN KEY (skill_type) REFERENCES skill_type_data (ID)
);

CREATE TABLE IF NOT EXISTS reset_password_emails (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    status boolean NOT NULL,
    time_stamp timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

COPY edu_spec_data FROM 'H:\ePortfolio\ePortfolio-backend\src\main\resources\staticData\edu_spec.csv'
    WITH (FORMAT csv, DELIMITER ';');

COPY edu_type_data FROM 'H:\ePortfolio\ePortfolio-backend\src\main\resources\staticData\edu_type.csv'
    WITH (FORMAT csv, DELIMITER ';');

COPY skill_type_data FROM 'H:\ePortfolio\ePortfolio-backend\src\main\resources\staticData\skill_type.csv'
    WITH (FORMAT csv, DELIMITER ';');

COPY work_type_data FROM 'H:\ePortfolio\ePortfolio-backend\src\main\resources\staticData\work_type.csv'
    WITH (FORMAT csv, DELIMITER ';');

COPY work_industry_data FROM 'H:\ePortfolio\ePortfolio-backend\src\main\resources\staticData\work_industries.csv'
    WITH (FORMAT csv, DELIMITER ';');

