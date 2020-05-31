package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.smtp.EmailService;
import com.example.eportfolio.smtp.MailRequestModel;
import com.example.eportfolio.smtp.MailResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository("postgres")
public class PostgresService implements UserDao {

    @Autowired
    private EmailService service;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addUser(UUID id, User user) {
        final String sqlFirst = "SELECT * FROM users WHERE email = '"+user.getEmail()+"'";
        String emailKey;
        String idKey;

        List<User> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });

        if (listFind.isEmpty()) {
            try {
                final String addUserSQL = "INSERT INTO users (id, first_name, last_name, email, password, role, confirmed) " +
                        "VALUES (uuid_generate_v4(), " +
                        "'"+user.getFirstName()+"', " +
                        "'"+user.getLastName()+"', " +
                        "'"+user.getEmail()+"', " +
                        "md5('"+user.getPassword()+"'),"+
                        "'"+user.getRole()+"',"+
                        ""+user.isConfirmed()+
                        ")";
                jdbcTemplate.execute(addUserSQL);

                final String addUserBioSQL = "INSERT INTO users_bio (id, user_uuid, phone, address_main, address_city, address_zip, address_country, date_birth, gender) VALUES (" +
                        "uuid_generate_v4(), " +
                        "(SELECT id FROM users WHERE email IN('"+user.getEmail()+"'))," +
                        "'','','','','','', '')";
                jdbcTemplate.execute(addUserBioSQL);

                final String addConfirmationEmailSQL = "INSERT INTO confirmation_emails (id, user_uuid, status) VALUES (" +
                    "uuid_generate_v4(), " +
                    "(SELECT id FROM users WHERE email IN('"+user.getEmail()+"')), "+
                    "false )";
                jdbcTemplate.execute(addConfirmationEmailSQL);

                String getEmailKey = "SELECT id FROM confirmation_emails WHERE user_uuid IN (SELECT id FROM users WHERE email = '"+user.getEmail()+"') AND status = false";
                emailKey = jdbcTemplate.queryForObject(getEmailKey, new Object[]{}, (resultSet, i) -> {
                    return new String (resultSet.getString("id"));
                });
                String getIdKey = "SELECT id FROM users WHERE email IN ('"+user.getEmail()+"')";
                idKey = jdbcTemplate.queryForObject(getIdKey, new Object[]{}, (resultSet, i) -> {
                    return new String (resultSet.getString("id"));
                });

                Map<String, Object> model = new HashMap<>();
                model.put("Name", user.getFirstName());
                model.put("location", "Poznań, Polska");
                model.put( "idKey", idKey);
                model.put( "linkKey", emailKey);

                MailRequestModel request = new MailRequestModel(user.getFirstName(), user.getEmail(), "ePortfolio", "ePortfolio | Potwierdzenie rejestracji");
                MailResponseModel response =  service.sendRegisterEmail(request, model);

                if (response.isStatus())
                    return 1;
                else
                    return 0;

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Add user to database error.");
                return 0;
            }
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
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
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
                        resultSet.getString("role"),
                        resultSet.getBoolean("confirmed")
                );
            }
        );
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> getUserByID(UUID id) {
        final String sql = "SELECT * FROM users WHERE id = ?";

        User user = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new User(
                            UUID.fromString(resultSet.getString("id")),
                            resultSet.getString("first_name"),
                            resultSet.getString("last_name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("role"),
                            resultSet.getBoolean("confirmed")
                    );
                }
        );
        return Optional.ofNullable(user);
    }

    @Override
    public int deleteUser(String email) {
        return 0;
    }

    @Override
    public int updateUser(UUID id, User user) {

        final String checkEmail = "SELECT * FROM users WHERE email = '"+user.getEmail()+"'";

        List<User> listFind = jdbcTemplate.query(checkEmail, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });

        if (listFind.isEmpty() || listFind.get(0).getId().toString().equals(user.getId().toString())) {

            try {
                final String updateUserSQL = "UPDATE users SET" +
                        " first_name = '" + user.getFirstName() +
                        "', last_name = '" + user.getLastName() +
                        "', email = '" + user.getEmail()
                        + "' WHERE id = '" + user.getId() + "';";

                jdbcTemplate.execute(updateUserSQL);
                return 1;

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Update user error.");
                return 0;
            }
        } else {
            System.out.println("Email error.");
            return -1;
        }
    }

    @Override
    public int deleteUser(UUID id) {

        final String checkUser = "SELECT * FROM users WHERE id= '"+ id +"'";

        if (true) {

            try {
                final String deleteUserSQL = "DELETE from USERS where id='" +
                        id +"';";

                jdbcTemplate.execute(deleteUserSQL);
                return 1;

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("delete user error");
                return 0;
            }
        } else {
            System.out.println("delete error - password");
            return -1;
        }
    }
}