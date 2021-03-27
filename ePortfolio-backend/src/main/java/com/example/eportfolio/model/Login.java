package com.example.eportfolio.model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
@Service
public class Login {
    private static final String KEY = "{%-<Oz#@,EHb0V%qQ#.)g;}B5ONr{L";
    private final int EXPIRATION_TIME_MINUTES = 30000;

    @Autowired
    private final JdbcTemplate jdbcTemplate;
    private User user;
    private String token;
    private static Map<String, Claim> claims;

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
                    .withClaim("id", user.getId().toString())
                    .withClaim("expiration_date", System.currentTimeMillis() + (EXPIRATION_TIME_MINUTES * 60000))
                    .sign(algorithm);
            this.token = token;

            return token;
        } catch (JWTCreationException exception) {
            return "Create token error.";
        }
    }

    public User getUser() { return this.user; }

    public static int checkJWT(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(KEY);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build();
            DecodedJWT jwt = verifier.verify(token);

            long exiprationTime = jwt.getClaim("expiration_date").asLong();
            long actualTime = System.currentTimeMillis();

            if (exiprationTime < actualTime) {
                return 2;
            } else {
                claims = jwt.getClaims();
                return 0;
            }
        } catch (JWTVerificationException jwtve) {
            return 1;
        }
    }

    public static Map<String, Claim> getClaims() {
        return claims;
    }
}
