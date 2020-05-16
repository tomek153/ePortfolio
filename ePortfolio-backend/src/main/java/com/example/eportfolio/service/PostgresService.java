package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
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

    public int changePassword(User user){

        final String sqlFirst = "SELECT * FROM users WHERE id ='" + user.getId() + "'";
        String sqlChangePassword;
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
            System.out.println("User");
            return 0;
        } else{
            //System.out.println(user.getId() + " =? " + listFind.get(0).getId());
            sqlChangePassword = "UPDATE users SET password = "+
                    "md5('"+user.getPassword()+"')"+
                    "where id ='"+ listFind.get(0).getId() +"'";
            jdbcTemplate.execute(sqlChangePassword);
            jdbcTemplate.execute("UPDATE reset_password_emails SET status = true WHERE user_uuid IN('"+user.getId()+"');");

        return 1;
        }
    }
    @Override
    public int resetPasswordRequest(User user){
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
           return 0;
        } else
            try {
                final String deactivateExistingResetPasswordLinks = "UPDATE reset_password_emails SET status = true WHERE" +
                        " user_uuid = (SELECT id FROM users WHERE email IN('" +user.getEmail()+"') limit 1)";
                jdbcTemplate.execute(deactivateExistingResetPasswordLinks);

                final String addResetPasswordEmailSQL = "INSERT INTO reset_password_emails (id, user_uuid, status) VALUES (" +
                        "uuid_generate_v4(), " +
                        "(SELECT id FROM users WHERE email IN('"+user.getEmail()+"')), "+
                        "false )";
                jdbcTemplate.execute(addResetPasswordEmailSQL);

                String getEmailKey = "SELECT id FROM reset_password_emails WHERE user_uuid IN (SELECT id FROM users WHERE email = '"+user.getEmail()+"') ORDER BY time_stamp desc limit 1";
                emailKey = jdbcTemplate.queryForObject(getEmailKey, new Object[]{}, (resultSet, i) -> {
                    return new String (resultSet.getString("id"));
                });
                String getIdKey = "SELECT id FROM users WHERE email IN ('"+user.getEmail()+"')";
                idKey = jdbcTemplate.queryForObject(getIdKey, new Object[]{}, (resultSet, i) -> {
                    return new String (resultSet.getString("id"));
                });

                Map<String, Object> model = new HashMap<>();
                model.put("Name", listFind.get(0).getFirstName());
                model.put("location", "Poznań, Polska");
                model.put( "idKey", idKey);
                model.put( "linkKey", emailKey);

                MailRequestModel request = new MailRequestModel(user.getFirstName(), user.getEmail(), "ePortfolio", "ePortfolio | Resetowanie hasła");
                MailResponseModel response =  service.sendResetPasswordEmail(request, model);

                if (response.isStatus())
                    return 1;
                else
                    return 0;

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Problem na etapie wysyłania maila resetowania hasła");
                return 0;
            }
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
    public int deleteUser(String email) {
        return 0;
    }

    @Override
    public int updateUser(String email, User user) {
        return 0;
    }
}
