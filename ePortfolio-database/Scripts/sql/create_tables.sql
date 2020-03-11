CREATE TABLE IF NOT EXISTS users (
	ID UUID PRIMARY KEY NOT NULL,
	first_name VARCHAR(45) NOT NULL,
	last_name VARCHAR(45) NOT NULL,
	email VARCHAR(60) NOT NULL,
	password VARCHAR NOT NULL,
	role VARCHAR(40) NOT NULL
		CONSTRAINT CK_users_role CHECK (role IN ('user', 'employer', 'admin'))
);
