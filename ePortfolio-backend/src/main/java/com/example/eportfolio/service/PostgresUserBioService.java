package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserBioDao;
import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository("postgresUserBio")
public class PostgresUserBioService implements UserBioDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresUserBioService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<UserBio> getUserBioByID(UUID id) {
        final String sql = "SELECT * FROM users_bio WHERE user_uuid = ?";

        UserBio userBio = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new UserBio(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getString("phone"),
                            resultSet.getString("address_main"),
                            resultSet.getString("address_city"),
                            resultSet.getString("address_zip"),
                            resultSet.getString("address_country"),
                            resultSet.getString("date_birth")
                    );
                }
        );
        return Optional.ofNullable(userBio);
    }

}
