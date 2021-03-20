COPY edu_spec_data FROM '/test_data/edu_spec.csv' WITH (FORMAT csv, DELIMITER ';');
COPY edu_type_data FROM '/test_data/edu_type.csv' WITH (FORMAT csv, DELIMITER ';');
COPY skill_type_data FROM '/test_data/skill_type.csv' WITH (FORMAT csv, DELIMITER ';');
COPY work_type_data FROM '/test_data/work_type.csv' WITH (FORMAT csv, DELIMITER ';');
COPY work_industry_data FROM '/test_data/work_industries.csv' WITH (FORMAT csv, DELIMITER ';');