package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserBioDao;
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
                            resultSet.getString("date_birth"),
                            resultSet.getString("gender")
                    );
                }
        );
        return Optional.ofNullable(userBio);
    }

    @Override
    public int updateUserBioByID(UUID id, UserBio userBio) {

        final String sqlFirst = "SELECT * FROM users_bio WHERE user_uuid = '" + userBio.getUserBioId() + "'";

        List<UserBio> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new UserBio(
                    UUID.fromString(resultSet.getString("user_uuid")),
                    resultSet.getString("phone"),
                    resultSet.getString("address_main"),
                    resultSet.getString("address_city"),
                    resultSet.getString("address_zip"),
                    resultSet.getString("address_ country"),
                    resultSet.getString("date_birth"),
                    resultSet.getString("gender")
            );
        });

        try {
            final String updateUserBioSQL = "UPDATE users_bio" +
                    "phone = " + userBio.getPhone() +
                    "address_main = " + userBio.getAddress_main() +
                    "address_city = " + userBio.getAddress_city() +
                    "address_ country = " + userBio.getAddress_country() +
                    "address_zip = " + userBio.getAddress_zip() +
                    "gender = " + userBio.getGender() +
                    "date_birth = " + userBio.getDate_birth() +
                    "WHERE user_uuid = '" + userBio.getUserBioId() + "'";

            jdbcTemplate.execute(updateUserBioSQL);
            return 1;

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Update user error.");
            return 0;
        }

    }

}
