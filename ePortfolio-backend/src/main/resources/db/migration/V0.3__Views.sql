CREATE VIEW user_info_all AS
    SELECT u.id, first_name, last_name, email, ub.image, phone, address_main, address_city, address_zip, address_country, date_birth, gender FROM users u
        INNER JOIN users_bio ub on u.id = ub.user_uuid
            INNER JOIN users_setting us on u.id = us.user_uuid
;