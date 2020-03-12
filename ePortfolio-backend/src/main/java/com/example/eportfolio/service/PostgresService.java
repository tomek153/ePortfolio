package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("postgres")
public class PostgresService implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addUser(UUID id, User user) {
        final String sqlFirst = "SELECT * FROM users WHERE email = '"+user.getEmail()+"'";

        List<User> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("role")
            );
        });

        if (listFind.isEmpty()) {
            final String sqlSecond = "INSERT INTO users (id, first_name, last_name, email, password, role) " +
                    "VALUES (uuid_generate_v4(), " +
                    "'"+user.getFirstName()+"', " +
                    "'"+user.getLastName()+"', " +
                    "'"+user.getEmail()+"', " +
                    "md5('"+user.getPassword()+"'),"+
                    "'"+user.getRole()+
                    "')";
            jdbcTemplate.execute(sqlSecond);
            return 1;
        } else
            return 0;
    }

    @Override
    public List<User> getUsers() {
        final String sql = "SELECT * FROM users";

        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("role")
            );
        });
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        final String sql = "SELECT * FROM users WHERE email = ?";

        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (resultSet, i) -> {
                    return new User(
                            UUID.fromString(resultSet.getString("id")),
                            resultSet.getString("first_name"),
                            resultSet.getString("last_name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("role")
                    );
                });
        return Optional.ofNullable(user);
    }

    @Override
    public int deleteUser(String email) {
        return 0;
    }

    @Override
    public int updateUser(String email, User user) {
        return 0;
    }
}
