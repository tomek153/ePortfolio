CREATE VIEW user_info_all AS
    SELECT u.id, first_name, last_name, email, ub.image, phone, address_main, address_city, address_zip, address_country, date_birth, gender FROM users u
        INNER JOIN users_bio ub on u.id = ub.user_uuid
        INNER JOIN users_setting us on u.id = us.user_uuid;

CREATE VIEW user_edu_profile AS
    SELECT ue.id, user_uuid, etd.name as edu_type, edu_name, edu_time_start, edu_time_end, edu_place, edu_desc, esd.name as edu_spec FROM users_edu ue
        INNER JOIN edu_spec_data esd on esd.id = ue.edu_spec
        INNER JOIN edu_type_data etd on etd.id = ue.edu_type;

CREATE VIEW user_work_profile AS
    SELECT uw.id, user_uuid, wtd.name as work_type, work_name, work_time_start, work_time_end, work_desc, wid.name as work_industry, l.name as work_place, wp.name as work_profession FROM users_work uw
        INNER JOIN work_industry_data wid on wid.id = uw.work_industry
        INNER JOIN work_type_data wtd on wtd.id = uw.work_type
        INNER JOIN work_professions wp on wp.id = uw.work_profession
        INNER JOIN locations l on l.id = uw.work_place;

CREATE VIEW user_skill_profile AS
    SELECT us.id, user_uuid, skill_name, std.name as skill_type, skill_time_months, skill_level FROM users_skill us
        INNER JOIN skill_type_data std on std.id = us.skill_type;

CREATE VIEW user_searching_profile AS
    SELECT DISTINCT ON(u.id) u.id, first_name, last_name, u.image, ub.address_city as address_city, uw.work_name as work_name, wp.name as work_profession from users u
        LEFT JOIN users_bio ub on u.id = ub.user_uuid
        LEFT JOIN (SELECT * FROM users_work ORDER BY work_time_end ASC) uw on u.id = uw.user_uuid
        LEFT JOIN work_professions wp on uw.work_profession = wp.id
    WHERE u.confirmed ORDER BY id;