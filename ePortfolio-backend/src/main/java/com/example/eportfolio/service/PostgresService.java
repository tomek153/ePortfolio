package com.example.eportfolio.service;

import com.example.eportfolio.api.DeleteMethods;
import com.example.eportfolio.dao.FixedDataDao;
import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import com.example.eportfolio.smtp.EmailService;
import com.example.eportfolio.smtp.MailRequestModel;
import com.example.eportfolio.smtp.MailResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;

@Repository("postgres")
public class PostgresService implements UserDao, FixedDataDao {

    @Autowired
    private EmailService service;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addUser(UUID id, User user) {
        final String sqlFirst = "SELECT * FROM users WHERE email = '" + user.getEmail() + "'";
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
                        "'" + user.getFirstName() + "', " +
                        "'" + user.getLastName() + "', " +
                        "'" + user.getEmail() + "', " +
                        "md5('" + user.getPassword() + "')," +
                        "'" + user.getRole() + "'," +
                        "" + user.isConfirmed() +
                        ")";
                jdbcTemplate.execute(addUserSQL);

                final String addUserBioSQL = "INSERT INTO users_bio (id, user_uuid, phone, address_main, address_city, address_zip, address_country, date_birth, gender) VALUES (" +
                        "uuid_generate_v4(), " +
                        "(SELECT id FROM users WHERE email IN('" + user.getEmail() + "'))," +
                        "'','','','','','', '')";
                jdbcTemplate.execute(addUserBioSQL);

                final String addConfirmationEmailSQL = "INSERT INTO confirmation_emails (id, user_uuid, status) VALUES (" +
                        "uuid_generate_v4(), " +
                        "(SELECT id FROM users WHERE email IN('" + user.getEmail() + "')), " +
                        "false )";
                jdbcTemplate.execute(addConfirmationEmailSQL);

                String getEmailKey = "SELECT id FROM confirmation_emails WHERE user_uuid IN (SELECT id FROM users WHERE email = '" + user.getEmail() + "') AND status = false";
                emailKey = jdbcTemplate.queryForObject(getEmailKey, new Object[]{}, (resultSet, i) -> {
                    return new String(resultSet.getString("id"));
                });
                String getIdKey = "SELECT id FROM users WHERE email IN ('" + user.getEmail() + "')";
                idKey = jdbcTemplate.queryForObject(getIdKey, new Object[]{}, (resultSet, i) -> {
                    return new String(resultSet.getString("id"));
                });

                Map<String, Object> model = new HashMap<>();
                model.put("Name", user.getFirstName());
                model.put("location", "Poznań, Polska");
                model.put("idKey", idKey);
                model.put("linkKey", emailKey);

                try {
                    MailRequestModel request = new MailRequestModel(user.getFirstName(), user.getEmail(), "ePortfolio", "ePortfolio | Potwierdzenie rejestracji");
                    MailResponseModel response = service.sendRegisterEmail(request, model);
                } catch (MailAuthenticationException mae) {
                    mae.printStackTrace();
                    return 3;
                } catch (MailException me) {
                    me.printStackTrace();
                    return 2;
                }
                return 1;

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Add user to database error.");
                return 0;
            }
        } else
            return 0;
    }

    public int changePassword(User user) {

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
        } else {
            //System.out.println(user.getId() + " =? " + listFind.get(0).getId());
            sqlChangePassword = "UPDATE users SET password = " +
                    "md5('" + user.getPassword() + "')" +
                    "where id ='" + listFind.get(0).getId() + "'";
            jdbcTemplate.execute(sqlChangePassword);
            jdbcTemplate.execute("UPDATE reset_password_emails SET status = true WHERE user_uuid IN('" + user.getId() + "');");

            return 1;
        }
    }

    @Override
    public int resetPasswordRequest(User user) {
        final String sqlFirst = "SELECT * FROM users WHERE email = '" + user.getEmail() + "'";
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
                        " user_uuid = (SELECT id FROM users WHERE email IN('" + user.getEmail() + "') limit 1)";
                jdbcTemplate.execute(deactivateExistingResetPasswordLinks);

                final String addResetPasswordEmailSQL = "INSERT INTO reset_password_emails (id, user_uuid, status) VALUES (" +
                        "uuid_generate_v4(), " +
                        "(SELECT id FROM users WHERE email IN('" + user.getEmail() + "')), " +
                        "false )";
                jdbcTemplate.execute(addResetPasswordEmailSQL);

                String getEmailKey = "SELECT id FROM reset_password_emails WHERE user_uuid IN (SELECT id FROM users WHERE email = '" + user.getEmail() + "') ORDER BY time_stamp desc limit 1";
                emailKey = jdbcTemplate.queryForObject(getEmailKey, new Object[]{}, (resultSet, i) -> {
                    return new String(resultSet.getString("id"));
                });
                String getIdKey = "SELECT id FROM users WHERE email IN ('" + user.getEmail() + "')";
                idKey = jdbcTemplate.queryForObject(getIdKey, new Object[]{}, (resultSet, i) -> {
                    return new String(resultSet.getString("id"));
                });

                Map<String, Object> model = new HashMap<>();
                model.put("Name", listFind.get(0).getFirstName());
                model.put("location", "Poznań, Polska");
                model.put("idKey", idKey);
                model.put("linkKey", emailKey);

                MailRequestModel request = new MailRequestModel(user.getFirstName(), user.getEmail(), "ePortfolio", "ePortfolio | Resetowanie hasła");
                MailResponseModel response = service.sendResetPasswordEmail(request, model);

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
    public Optional<UserBio> getUserBioByID(UUID ID) {
        final String sql = "SELECT user_uuid, phone, address_main, address_city, address_zip, address_country, date_birth, gender FROM users_bio WHERE user_uuid = ?";

        UserBio userBio = jdbcTemplate.queryForObject(
                sql,
                new Object[]{ID},
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
    public List<UserWork> getUserWorkByID(UUID ID) {
        final String sql = "SELECT * FROM users_work WHERE user_uuid = ?";

        return jdbcTemplate.query(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserWork(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getInt("work_industry"),
                            resultSet.getInt("work_type"),
                            resultSet.getString("work_name"),
                            resultSet.getString("work_time_start"),
                            resultSet.getString("work_time_end"),
                            resultSet.getString("work_place"),
                            resultSet.getString("work_desc"),
                            resultSet.getString("work_location")
                    );
                }
        );

    }

    @Override
    public List<UserEdu> getUserEduByID(UUID ID) {
        final String sql = "SELECT * FROM users_edu WHERE user_uuid = ?";

        return jdbcTemplate.query(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserEdu(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getInt("edu_spec"),
                            resultSet.getInt("edu_type"),
                            resultSet.getString("edu_name"),
                            resultSet.getString("edu_time_start"),
                            resultSet.getString("edu_time_end"),
                            resultSet.getString("edu_place"),
                            resultSet.getString("edu_desc")
                    );
                }
        );

    }

    @Override
    public List<UserSkill> getUserSkillByID(UUID ID) {
        final String sql = "SELECT * FROM users_skill WHERE user_uuid = ?";

        return jdbcTemplate.query(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserSkill(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getInt("skill_type"),
                            resultSet.getInt("skill_time_months"),
                            resultSet.getInt("skill_level"),
                            resultSet.getString("skill_name")
                    );
                }
        );

    }

    @Override
    public Optional<UserSetting> getUserSettingByID(UUID ID) {
        final String sql = "SELECT * FROM users_setting WHERE user_uuid = ?";

        UserSetting userSetting = jdbcTemplate.queryForObject(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserSetting(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getBoolean("setting_public"),
                            resultSet.getString("setting_header1"),
                            resultSet.getString("setting_header2"),
                            resultSet.getString("setting_img"),
                            resultSet.getBoolean("setting_consent"),
                            resultSet.getBoolean("setting_allow_contact")
                    );
                }
        );
        return Optional.ofNullable(userSetting);
    }


    @Override
    public int updateUser(String email, User user) {

        final String checkEmail = "SELECT * FROM users WHERE email = '" + user.getEmail() + "'";

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

    @Override
    public void deleteUser(UUID id) throws SQLException {

        //final String checkUser = "SELECT * FROM users WHERE id= '" + id + "'";

        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
        try {
            conn.setAutoCommit(false);

            DeleteMethods deleteMethods = new DeleteMethods();
            conn.prepareStatement(deleteMethods.deleteFromTable("users_edu",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("users_bio",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("users_work",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("users_skill",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("users_setting",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("confirmation_emails",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("reset_password_emails",id)).executeUpdate();;
            conn.prepareStatement(deleteMethods.deleteFromTable("users",id)).executeUpdate();;
            conn.commit();

        } catch (SQLException e) {
            conn.rollback();
            e.printStackTrace();
            System.err.println("delete user error");
        }

    }

    @Override
    public List<FixedData> getFixedData(String dataType) {

        String sql = "SELECT * FROM " + dataType + "_data";

        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return new FixedData(
                    resultSet.getInt("id"),
                    resultSet.getString("name")
            );
        });
    }

}
