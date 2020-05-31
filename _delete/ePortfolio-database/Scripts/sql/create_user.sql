CREATE USER eportfolio_user WITH ENCRYPTED PASSWORD 'Test123!';
ALTER USER eportfolio_user WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE "eportfolio_db" to eportfolio_user;
