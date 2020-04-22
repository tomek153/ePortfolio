package com.example.eportfolio.model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
@Service
public class Login {
    private final String KEY = "{%-<Oz#@,EHb0V%qQ#.)g;}B5ONr{L";
    private final int EXPIRATION_TIME_MINUTES = 30;

    @Autowired
    private final JdbcTemplate jdbcTemplate;
    private User user;
    private String token;

    public Login(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int authenticate(String email, String password) {
        User user;
        final String sql = "SELECT * FROM users WHERE email = '"+email+"' AND password = md5('"+password+"')";
        try {
            user = jdbcTemplate.queryForObject(sql, new Object[]{}, (resultSet, i) -> {
                return new User (
                        UUID.fromString(resultSet.getString("id")),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email"),
                        resultSet.getString("password"),
                        resultSet.getString("role"),
                        resultSet.getBoolean("confirmed")
                );
            });
        } catch (EmptyResultDataAccessException excepion) {
            return 1;
        }

        this.user = user;
        if (!user.isConfirmed())
            return 2;
        else
            return 0;
    }

    public String createToken() {
        try {
            Algorithm algorithm = Algorithm.HMAC256(KEY);
            String token = JWT.create()
                    .withIssuer("auth0")
                    .withClaim("first_name", user.getFirstName())
                    .withClaim("last_name", user.getLastName())
                    .withClaim("email", user.getEmail())
                    .withClaim("expiration_date", new Date(System.currentTimeMillis() + (EXPIRATION_TIME_MINUTES * 60000)))
                    .sign(algorithm);
            this.token = token;

            return token;
        } catch (JWTCreationException exception) {
            return "Create token error.";
        }
    }

    public User getUser() { return this.user; }
}
