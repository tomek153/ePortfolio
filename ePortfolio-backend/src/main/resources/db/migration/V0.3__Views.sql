CREATE VIEW user_info_all AS
    SELECT u.id, first_name, last_name, email, image, phone, address_main, address_city, address_zip, address_country, date_birth, gender, setting_public, setting_header1, setting_header2, setting_consent, setting_allow_contact FROM users u
        INNER JOIN users_bio ub on u.id = ub.user_uuid
            INNER JOIN users_setting us on u.id = us.user_uuid
;