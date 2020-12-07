package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.UserBio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
/*
@Repository("postgresUserBio")
public class PostgresUserBioService implements userDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresUserBioService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public int updateUserBio(UUID id, UserBio userBio) {

        try {
            final String updateUserBioSQL = "UPDATE users_bio SET" +
                    " phone = '" + userBio.getPhone() +
                    "', address_main = '" + userBio.getAddress_main() +
                    "', address_city = '" + userBio.getAddress_city() +
                    "', address_country = '" + userBio.getAddress_country() +
                    "', address_zip = '" + userBio.getAddress_zip() +
                    "', gender = '" + userBio.getGender() +
                    "', date_birth = '" + userBio.getDate_birth() +
                    "' WHERE user_uuid = '" + userBio.getUserBioId() + "';";

            jdbcTemplate.execute(updateUserBioSQL);
            return 1;

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Update user error.");
            return 0;
        }
    }

}*/
