CREATE VIEW user_info_all AS
    SELECT u.id, first_name, last_name, email, ub.image, phone, address_main, address_city, address_zip, address_country, date_birth, gender FROM users u
        INNER JOIN users_bio ub on u.id = ub.user_uuid
        INNER JOIN users_setting us on u.id = us.user_uuid;

CREATE VIEW user_edu_profile AS
    SELECT ue.id, user_uuid, etd.name as edu_type, edu_name, edu_time_start, edu_time_end, edu_place, edu_desc, esd.name as edu_spec FROM users_edu ue
        INNER JOIN edu_spec_data esd on esd.id = ue.edu_spec
        INNER JOIN edu_type_data etd on etd.id = ue.edu_type;

CREATE VIEW user_work_profile AS
    SELECT uw.id, user_uuid, wtd.name as work_type, work_name, work_time_start, work_time_end, work_place, work_desc, wid.name as work_industry, l.name as work_location, wp.name as work_profession FROM users_work uw
        INNER JOIN work_industry_data wid on wid.id = uw.work_industry
        INNER JOIN work_type_data wtd on wtd.id = uw.work_type
        INNER JOIN work_professions wp on wp.id = uw.work_profession
        INNER JOIN locations l on l.id = uw.work_location;