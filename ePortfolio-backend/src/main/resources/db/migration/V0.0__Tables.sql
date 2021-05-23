CREATE TABLE IF NOT EXISTS work_industry_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS work_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS work_professions (
    ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
    ID SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS skill_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS edu_type_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS edu_spec_data (
	ID INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	ID UUID PRIMARY KEY NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	image VARCHAR NOT NULL,
	role VARCHAR NOT NULL
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
    phone VARCHAR NOT NULL,
    address_main VARCHAR NOT NULL,
    address_city VARCHAR NOT NULL,
    address_zip VARCHAR NOT NULL,
    address_country VARCHAR NOT NULL,
    date_birth DATE,
    gender VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

CREATE TABLE IF NOT EXISTS users_setting (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    setting_public BOOLEAN NOT NULL,
    setting_header1 VARCHAR NOT NULL,
    setting_header2 VARCHAR NOT NULL,
    setting_consent BOOLEAN NOT NULL,
    setting_allow_contact BOOLEAN NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID)
);

CREATE TABLE IF NOT EXISTS users_work (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    work_type INTEGER NOT NULL,
    work_name VARCHAR NOT NULL,
    work_time_start DATE NOT NULL,
    work_time_end DATE NOT NULL,
    work_place INTEGER NOT NULL,
    work_desc VARCHAR NOT NULL,
    work_industry INTEGER NOT NULL,
    work_profession INTEGER NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID),
    FOREIGN KEY (work_industry) REFERENCES work_industry_data (ID),
    FOREIGN KEY (work_type) REFERENCES work_type_data (ID),
    FOREIGN KEY (work_profession) REFERENCES work_professions (ID),
    FOREIGN KEY (work_place) REFERENCES locations (ID)
);

CREATE TABLE IF NOT EXISTS users_edu (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    edu_type INTEGER NOT NULL,
    edu_name VARCHAR NOT NULL,
    edu_time_start DATE NOT NULL,
    edu_time_end DATE NOT NULL,
    edu_place VARCHAR NOT NULL,
    edu_desc VARCHAR NOT NULL,
    edu_spec INTEGER NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users (ID),
    FOREIGN KEY (edu_spec) REFERENCES edu_spec_data (ID),
    FOREIGN KEY (edu_type) REFERENCES edu_type_data (ID)
);

CREATE TABLE IF NOT EXISTS users_skill (
	ID UUID PRIMARY KEY NOT NULL,
    user_uuid UUID NOT NULL,
    skill_type INTEGER NOT NULL,
    skill_name VARCHAR NOT NULL,
    skill_time_months INTEGER NOT NULL,
    skill_level VARCHAR NOT NULL,
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

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;