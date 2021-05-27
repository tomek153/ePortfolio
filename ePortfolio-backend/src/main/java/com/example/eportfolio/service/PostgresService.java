package com.example.eportfolio.service;

import com.example.eportfolio.api.DeleteMethods;
import com.example.eportfolio.dao.*;
import com.example.eportfolio.model.*;
import com.example.eportfolio.smtp.EmailService;
import com.example.eportfolio.smtp.MailRequestModel;
import com.example.eportfolio.smtp.MailResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Stream;

@Repository("postgres")
public class PostgresService implements UserDao, FixedDataDao, EduDao, WorkDao, SkillDao, ChatDao {

    @Autowired
    private EmailService service;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresService (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addUser(User user) throws SQLException {

        String emailKey;

        final String sqlAddUser = "SELECT add_user('"
                +user.getFirstName()+"', '"
                +user.getLastName()+"', '"
                +user.getEmail()+"', '"
                +user.getPassword()+"', '"
                +user.getRole()+"')"
        ;

        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
        conn.setAutoCommit(false);
        try {
            ResultSet addUserResultSet = conn.prepareStatement(sqlAddUser).executeQuery();
            addUserResultSet.next();
            user.setId((UUID)addUserResultSet.getObject("add_user"));

            final String sqlAddUserBio = "SELECT add_user_bio('"+user.getId()+"', '', '', '', '', '', null, '')";
            final String sqlAddUserSettings = "SELECT add_user_settings('"+user.getId()+"', true, '', '', true, true)";
            final String sqlAddUserConfirmationEmail = "SELECT add_user_confirmation_email('"+user.getId()+"', false)";

            conn.prepareStatement(sqlAddUserBio).execute();
            conn.prepareStatement(sqlAddUserSettings).execute();

            ResultSet addConfirmationEmailResultSet = conn.prepareStatement(sqlAddUserConfirmationEmail).executeQuery();
            addConfirmationEmailResultSet.next();
            emailKey = addConfirmationEmailResultSet.getObject("add_user_confirmation_email").toString();

            conn.commit();

            Map<String, Object> model = new HashMap<>();
            model.put("Name", user.getFirstName());
            model.put("location", "Poznań, Polska");
            model.put( "idKey", user.getId());
            model.put( "linkKey", emailKey);

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

        } catch (SQLException e) {
            conn.rollback();
            e.printStackTrace();
            System.err.println("Add user to database error.");
            return 0;
        }

    }

    public int changePassword(ResetPasswordRequest resetPasswordRequest){

        final String sqlFirst = "SELECT * FROM users WHERE id = ?";
        String sqlChangePassword;

        List<User> listFind = jdbcTemplate.query(sqlFirst, new Object[]{resetPasswordRequest.getUser_uuid()}, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("image"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });

        if (listFind.isEmpty()) {
            return 0;
        } else{
            sqlChangePassword = "UPDATE users SET password = "+
                    "md5('" + resetPasswordRequest.getPassword() + "')"+
                    "where id ='" + resetPasswordRequest.getUser_uuid() + "'";
            jdbcTemplate.execute(sqlChangePassword);
            jdbcTemplate.execute("UPDATE reset_password_emails SET status = true WHERE user_uuid IN('" + resetPasswordRequest.getUser_uuid() + "');");

            return 1;
        }
    }

    @Override
    public int resetPasswordRequest(String email){
        String sqlFirst = "SELECT * FROM users WHERE email = ?";

        List<User> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("image"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        }, email);

        if (listFind.isEmpty()) {
           return 0;
        } else {
            try {
                User user = listFind.get(0);

                final String deactivateExistingResetPasswordLinks = "UPDATE reset_password_emails SET status = true WHERE user_uuid = '"+user.getId()+"'";
                jdbcTemplate.execute(deactivateExistingResetPasswordLinks);

                final String addResetPasswordEmailSQL = "INSERT INTO reset_password_emails (id, user_uuid, status) VALUES (" +
                        "uuid_generate_v4(), " +
                        "'" + user.getId() + "', " +
                        "false )";
                jdbcTemplate.execute(addResetPasswordEmailSQL);

                String getEmailKey = "SELECT id FROM reset_password_emails WHERE user_uuid = ? AND status = false";
                String emailKey = jdbcTemplate.queryForObject(getEmailKey, new Object[]{user.getId()}, (resultSet, i) -> {
                    return new String(resultSet.getString("id"));
                });

                Map<String, Object> model = new HashMap<>();
                model.put("Name", user.getFirstName());
                model.put("location", "Poznań, Polska");
                model.put("idKey", user.getId());
                model.put("linkKey", emailKey);

                MailRequestModel request = new MailRequestModel(user.getFirstName(), email, "ePortfolio", "ePortfolio | Resetowanie hasła");
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
                    resultSet.getString("image"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });
    }

    @Override
    public boolean checkUserExistByEmail(String email) {
        final String sql = "SELECT * FROM users WHERE email = '"+email+"'";

        List<User> listFind = jdbcTemplate.query(sql, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("image"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });

        return !listFind.isEmpty();
    }

    @Override
    public User getUserByID(UUID id) {
        final String sql = "SELECT * FROM users WHERE id = ?";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new User(
                            UUID.fromString(resultSet.getString("id")),
                            resultSet.getString("first_name"),
                            resultSet.getString("last_name"),
                            resultSet.getString("email"),
                            resultSet.getString("image"),
                            resultSet.getString("role"),
                            resultSet.getBoolean("confirmed")
                    );
                }
        );
    }

    @Override
    public Optional<UserBio> getUserBioByID(UUID ID) {
        final String sql = "SELECT user_uuid, phone, address_main, address_city, address_zip, address_country, date_birth, gender FROM users_bio WHERE user_uuid = ?";

        UserBio userBio = jdbcTemplate.queryForObject(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserBio(
                            UUID.fromString(resultSet.getString("id")),
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getString("phone"),
                            resultSet.getString("address_main"),
                            resultSet.getString("address_city"),
                            resultSet.getString("address_zip"),
                            resultSet.getString("address_country"),
                            resultSet.getString("date_birth"),
                            resultSet.getString("gender"),
                            resultSet.getString("image")
                    );
                }
        );
        return Optional.ofNullable(userBio);
    }

    @Override
    public List<UserWork> getUserWorkByID(UUID ID) {
        final String sql = "SELECT * FROM user_work_profile WHERE user_uuid = ? ORDER BY work_time_end DESC";

        return jdbcTemplate.query(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserWork(
                            UUID.fromString(resultSet.getString("id")),
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getString("work_industry"),
                            resultSet.getString("work_type"),
                            resultSet.getString("work_name"),
                            resultSet.getString("work_time_start"),
                            resultSet.getString("work_time_end"),
                            resultSet.getString("work_place"),
                            resultSet.getString("work_desc"),
                            resultSet.getString("work_profession")
                    );
                }
        );

    }

    @Override
    public List<UserSkill> getUserSkillByID(UUID ID) {
        final String sql = "SELECT * FROM user_skill_profile WHERE user_uuid = ?";

        return jdbcTemplate.query(
                sql,
                new Object[]{ID},
                (resultSet, i) -> {
                    return new UserSkill(
                            UUID.fromString(resultSet.getString("id")),
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getString("skill_type"),
                            resultSet.getInt("skill_time_months"),
                            resultSet.getString("skill_level"),
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
                            UUID.fromString(resultSet.getString("id")),
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
    public int deleteUser(UUID id) throws SQLException {

        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
        try {
            conn.setAutoCommit(false);

            DeleteMethods deleteMethods = new DeleteMethods();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users_edu",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users_bio",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users_work",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users_skill",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users_setting",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("confirmation_emails",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("reset_password_emails",id)).executeUpdate();
            conn.prepareStatement(deleteMethods.deleteUserFromTable("users",id)).executeUpdate();
            conn.commit();
            return 0;

        } catch (SQLException e) {
            conn.rollback();
            e.printStackTrace();
            System.err.println("delete user error");
            return 1;
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

    @Override
    public SearchingFilters getSearchingFilters() {

        SearchingFilters searchingFilters = new SearchingFilters();

        final String sqlCity = "SELECT DISTINCT ON (address_city) row_number() over (order by (Select 0)) as value, address_city as label FROM users_bio WHERE address_city != '';";
        final String sqlWorkName = "SELECT DISTINCT ON (work_name) row_number() over (order by (Select 0)) as value, work_name as label FROM users_work;";
        final String sqlWorkIndustry = "SELECT DISTINCT ON (wid.name) row_number() over (order by (Select 0)) as value, wid.name as label FROM users_work INNER JOIN work_industry_data wid on wid.id = users_work.work_industry;";
        final String sqlEduName = "SELECT DISTINCT ON (edu_name) row_number() over (order by (Select 0)) as value, edu_name as label FROM users_edu;";
        final String sqlEduSpec = "SELECT DISTINCT ON (esd.name) row_number() over (order by (Select 0)) as value, esd.name as label FROM users_edu INNER JOIN edu_spec_data esd on esd.id = users_edu.edu_spec;";
        final String sqlSkillName = "SELECT DISTINCT ON (skill_name) row_number() over (order by (Select 0)) as value, skill_name as label FROM users_skill;";

        searchingFilters.setAddressCityList(jdbcTemplate.query(sqlCity, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));
        searchingFilters.setWorkNameList(jdbcTemplate.query(sqlWorkName, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));
        searchingFilters.setWorkIndustryList(jdbcTemplate.query(sqlWorkIndustry, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));
        searchingFilters.setEduNameList(jdbcTemplate.query(sqlEduName, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));
        searchingFilters.setEduSpecList(jdbcTemplate.query(sqlEduSpec, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));
        searchingFilters.setSkillNameList(jdbcTemplate.query(sqlSkillName, (resultSet, i) -> {
            return new SelectRow(
                    resultSet.getInt("value"),
                    resultSet.getString("label")
            );
        }));

        return searchingFilters;
    }

    @Override
    public int addUserWork(Map workMap, UUID id) {

        final String sql = "INSERT INTO users_work(id, user_uuid, work_type, work_name, work_time_start, work_time_end, work_place, work_desc, work_industry, work_profession)" +
                " VALUES (uuid_generate_v4(), " +
                "'" + id + "', "+
                "'" + workMap.get("work_type") + "', "+
                "'" + workMap.get("work_name") + "', "+
                "'" + new Date((long)workMap.get("work_start_date")) + "', "+
                "'" + new Date((long)workMap.get("work_end_date")) + "', "+
                "'" + workMap.get("work_place") + "', "+
                "'" + workMap.get("work_description") + "', "+
                "'" + workMap.get("work_industry") + "', " +
                "'" + workMap.get("work_profession") + "'" +
                ")";

        try {
            jdbcTemplate.execute(sql);
        } catch (DataAccessException dataAccessException) {
            System.err.println("addUserWork() error");
            dataAccessException.printStackTrace();
            return 1;
        }

        return 0;
    }

    @Override
    public int addUserEdu(Map addMap, UUID id) {

        final String sql = "INSERT INTO users_edu(id, user_uuid, edu_type, edu_name, edu_time_start, edu_time_end, edu_place, edu_desc, edu_spec)" +
                " VALUES (uuid_generate_v4(), " +
                "'" + id + "', "+
                "'" + addMap.get("edu_type") + "', "+
                "'" + addMap.get("edu_name") + "', "+
                "'" + new Date((long)addMap.get("edu_time_start")) + "', "+
                "'" + new Date((long)addMap.get("edu_time_end")) + "', "+
                "'" + addMap.get("edu_place") + "', "+
                "'" + addMap.get("edu_desc") + "', "+
                "'" + addMap.get("edu_spec") + "'" +
                ")";
        try {
            jdbcTemplate.execute(sql);
        } catch (DataAccessException dataAccessException) {
            System.err.println("addUserEdu() error");
            dataAccessException.printStackTrace();
            return 1;
        }

        return 0;
    }

    @Override
    public int addUserSkill(Map addMap, UUID id) {

        final String sql = "INSERT INTO users_skill(id, user_uuid, skill_type, skill_name, skill_time_months, skill_level)" +
                " VALUES (uuid_generate_v4(), " +
                "'" + id + "', "+
                "'" + addMap.get("skill_type") + "', "+
                "'" + addMap.get("skill_name") + "', "+
                "'" + addMap.get("skill_time") + "', "+
                "'" + addMap.get("skill_level") + "'" +
                ")";
        try {
            jdbcTemplate.execute(sql);
        } catch (DataAccessException dataAccessException) {
            System.err.println("addUserSkill() error");
            dataAccessException.printStackTrace();
            return 1;
        }

        return 0;
    }

    @Override
    public UserProfileAll getUserProfileAll(UUID id) throws SQLException {

        return jdbcTemplate.queryForObject(
                "SELECT * FROM user_info_all WHERE id = ?",
                new Object[] {id},
                (resultSet, i) -> { return new UserProfileAll(
                        UUID.fromString(resultSet.getString("id")),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email"),
                        resultSet.getString("image"),
                        resultSet.getString("phone"),
                        resultSet.getString("address_main"),
                        resultSet.getString("address_city"),
                        resultSet.getString("address_zip"),
                        resultSet.getString("address_country"),
                        resultSet.getTimestamp("date_birth"),
                        resultSet.getString("gender")
                ); }
        );

//        userProfileAll.setUserWorkList(jdbcTemplate.query(
//                "SELECT * FROM users_work WHERE user_uuid = ?",
//                new Object[] {id},
//                (resultSet, i) -> { return new UserWork(
//                        UUID.fromString(resultSet.getString("id")),
//                        UUID.fromString(resultSet.getString("user_uuid")),
//                        resultSet.getInt("work_industry"),
//                        resultSet.getInt("work_type"),
//                        resultSet.getString("work_name"),
//                        resultSet.getString("work_time_start"),
//                        resultSet.getString("work_time_end"),
//                        resultSet.getString("work_place"),
//                        resultSet.getString("work_desc"),
//                        resultSet.getString("work_location")
//                ); }
//        ));

//        userProfileAll.setUserSkillList(jdbcTemplate.query(
//                "SELECT * FROM users_skill WHERE user_uuid = ?",
//                new Object[] {id},
//                (resultSet, i) -> { return new UserSkill(
//                        UUID.fromString(resultSet.getString("id")),
//                        UUID.fromString(resultSet.getString("user_uuid")),
//                        resultSet.getInt("skill_type"),
//                        resultSet.getInt("skill_time_months"),
//                        resultSet.getInt("skill_level"),
//                        resultSet.getString("skill_name")
//                ); }
//        ));
    }

    @Override
    public List<UserEdu> getUserEdu(UUID id) {

        return jdbcTemplate.query(
                "SELECT * FROM user_edu_profile WHERE user_uuid = ? ORDER BY edu_time_end DESC",
                new Object[] {id},
                (resultSet, i) -> { return new UserEdu(
                        UUID.fromString(resultSet.getString("id")),
                        UUID.fromString(resultSet.getString("user_uuid")),
                        resultSet.getString("edu_spec"),
                        resultSet.getString("edu_type"),
                        resultSet.getString("edu_name"),
                        resultSet.getString("edu_time_start"),
                        resultSet.getString("edu_time_end"),
                        resultSet.getString("edu_place"),
                        resultSet.getString("edu_desc")
                ); }
        );
    }

    @Override
    public int updateUserProfile(Map profile, UUID id) throws SQLException {

        try {
            jdbcTemplate.update(
                    "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
                    profile.get("first_name"),
                    profile.get("last_name"),
                    profile.get("email"),
                    id);

            Date date;
            if (profile.get("date_birth") == null) {
                date = null;
            } else {
                date = new Date((long)profile.get("date_birth"));
            }

            jdbcTemplate.update(
                    "update users_bio SET phone = ?, address_main = ?, address_city = ?, address_zip = ?, address_country = ?, date_birth = ?, gender = ? WHERE user_uuid = ?",
                    profile.get("phone"),
                    profile.get("address_main"),
                    profile.get("address_city"),
                    profile.get("address_zip"),
                    profile.get("address_country"),
                    date,
                    profile.get("gender"),
                    id);

        } catch(DataAccessException dataAccessException) {
            dataAccessException.printStackTrace();
            return 1;
        }

        return 0;
    }

    @Override
    public int updateImage(String imageUrl, String imageSmallUrl, UUID userId) {

        try {
            jdbcTemplate.update(
                    "UPDATE users SET image = ? WHERE id = ?",
                    new Object[]{imageSmallUrl, userId}
            );
            jdbcTemplate.update(
                    "UPDATE users_bio SET image = ? WHERE user_uuid = ?",
                    new Object[]{imageUrl, userId}
            );
        } catch(DataAccessException dataAccessException) {
            return 1;
        }

        return 0;
    }

    @Override
    public List<UserSearching> getSearchingUsers(List<String> ids) {

        String sql;

        if (ids.size() == 0) {
            sql = "SELECT * FROM user_searching_profile";
        } else {
            sql = "SELECT * FROM user_searching_profile WHERE id IN (";

            Iterator<String> iterator = ids.iterator();
            while (iterator.hasNext()) {
                String id = iterator.next();

                sql += "'"+id+"'";

                if (iterator.hasNext())
                    sql += ", ";
                else
                    sql += ")";
            }
        }

        return jdbcTemplate.query(
                sql,
                (resultSet, i) -> { return new UserSearching(
                        UUID.fromString(resultSet.getString("id")),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("image"),
                        resultSet.getString("address_city"),
                        resultSet.getString("work_name"),
                        resultSet.getString("work_profession")
                );}
        );
    }

    @Override
    public UserSearchingAll getUserSearchingAll(UUID id) {

        UserSearchingAll userSearchingAll = new UserSearchingAll();

        User user = jdbcTemplate.queryForObject(
                "SELECT * FROM users WHERE id = ?",
                new Object[]{id},
                (rs, rowNum) -> new User(
                        UUID.fromString(rs.getString("id")),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("email")
                )
        );

        UserBio userBio = jdbcTemplate.queryForObject(
                "SELECT * FROM users_bio WHERE user_uuid = ?",
                new Object[]{id},
                (rs, rowNum) -> new UserBio(
                        rs.getString("phone"),
                        rs.getString("address_main"),
                        rs.getString("address_city"),
                        rs.getString("address_zip"),
                        rs.getString("address_country"),
                        rs.getString("date_birth"),
                        rs.getString("gender"),
                        rs.getString("image")
                ));

        List<UserEdu> userEduList = getUserEdu(id);

        List<UserWork> userWorkList = getUserWorkByID(id);

        List<UserSkill> userSkillList = getUserSkillByID(id);

        userSearchingAll.setId(user.getId());
        userSearchingAll.setFirstName(user.getFirstName());
        userSearchingAll.setLastName(user.getLastName());
        userSearchingAll.setEmail(user.getEmail());
        userSearchingAll.setPhone(userBio.getPhone());
        userSearchingAll.setAddress_main(userBio.getAddress_main());
        userSearchingAll.setAddress_city(userBio.getAddress_city());
        userSearchingAll.setAddress_zip(userBio.getAddress_zip());
        userSearchingAll.setAddress_country(userBio.getAddress_country());
        if (userBio.getDate_birth() == null)
            userSearchingAll.setDate_birth("");
        else
            userSearchingAll.setDate_birth(userBio.getDate_birth());
        userSearchingAll.setGender(userBio.getGender());
        userSearchingAll.setImage(userBio.getImage());
        userSearchingAll.setUserEduList(userEduList);
        userSearchingAll.setUserWorkList(userWorkList);
        userSearchingAll.setUserSkillList(userSkillList);

        return userSearchingAll;
    }

    @Override
    public int deleteUserWork(UUID id, UUID userId) {

        try {
            jdbcTemplate.update(
                    "DELETE FROM users_work WHERE user_uuid = ? AND id = ?",
                    userId, id);
        } catch(DataAccessException dataAccessException) {
            return 1;
        }

        return 0;
    }

    @Override
    public int deleteUserEdu(UUID id, UUID userId) {

        try {
            jdbcTemplate.update(
                    "DELETE FROM users_edu WHERE user_uuid = ? AND id = ?",
                    userId, id);
        } catch(DataAccessException dataAccessException) {
            return 1;
        }

        return 0;
    }

    @Override
    public int deleteUserSkill(UUID id, UUID userId) {

        try {
            jdbcTemplate.update(
                    "DELETE FROM users_skill WHERE user_uuid = ? AND id = ?",
                    userId, id);
        } catch(DataAccessException dataAccessException) {
            return 1;
        }

        return 0;
    }

    @Override
    public int updateUserSkill(UUID userUUID, UserSkill userSkill) throws SQLException{

        final String sqlFirst = "SELECT * FROM users_skill WHERE user_uuid = '"+userUUID+"' AND id = '"+userSkill.getId()+"';";

        List<UserSkill> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new UserSkill(
                    UUID.fromString(resultSet.getString("id")),
                    UUID.fromString(resultSet.getString("user_uuid")),
                    resultSet.getString("skill_type"),
                    resultSet.getInt("skill_time_months"),
                    resultSet.getString("skill_level"),
                    resultSet.getString("skill_name")
            );
        });
        System.out.println(listFind);
        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());

        if (!listFind.isEmpty()) {
            try {
                conn.setAutoCommit(false);

                final String sqlUpdate = "UPDATE users_skill SET" +
                        " skill_type = '" + userSkill.getSkill_type() +
                        "', skill_time_months = '" + userSkill.getSkill_time_months() +
                        "', skill_level = '" + userSkill.getSkill_level() +
                        "', skill_name = '" + userSkill.getSkill_name() +
                        "' WHERE id = '" + userSkill.getId() + "';";

                conn.prepareStatement(sqlUpdate).executeUpdate();
                conn.commit();
                return 0;

            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
                System.err.println("update userskill error - sql");
                return 1;
            }
        }
        else {
            System.err.println("update userskill error - no record");
            return 2;
        }
    }

    @Override
    public int editUser(UUID userUUID, User user) throws SQLException {
        final String sqlFirst = "SELECT * FROM users WHERE id = '"+userUUID+"'";

        List<User> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("image"),
                    resultSet.getString("role"),
                    resultSet.getBoolean("confirmed")
            );
        });
        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());

        if (!listFind.isEmpty()) {
            try {
                conn.setAutoCommit(false);

                final String updateUserSQL = "UPDATE users SET " +
                        "first_name ='"+user.getFirstName()+"', " +
                        "last_name = '"+user.getLastName()+"', " +
                        "email = '"+user.getEmail()+"' " +
                        "WHERE id = '" + userUUID + "';";

                conn.prepareStatement(updateUserSQL).executeUpdate();
                conn.commit();
                return 0;

            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
                System.err.println("Update user error - SQL");
                return 1;
            }
        } else
            System.err.println("Update user error - no user");
        return 2;

    }

    @Override
    public int editUserBio(UUID userUUID, UserBio userBio) throws SQLException {
        final String sqlFirst = "SELECT * FROM users_bio WHERE user_uuid = '"+userUUID+"'";

        List<UserBio> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new UserBio(
                    UUID.fromString(resultSet.getString("id")),
                    UUID.fromString(resultSet.getString("user_uuid")),
                    resultSet.getString("phone"),
                    resultSet.getString("address_main"),
                    resultSet.getString("address_city"),
                    resultSet.getString("address_zip"),
                    resultSet.getString("address_country"),
                    resultSet.getString("date_birth"),
                    resultSet.getString("gender")
            );
        });
        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());

        if (!listFind.isEmpty()) {
            try {
                conn.setAutoCommit(false);

                final String updateBioSQL = "UPDATE users_bio SET " +
                        "phone ='"+userBio.getPhone()+"', " +
                        "address_main = '"+userBio.getAddress_main()+"', " +
                        "address_city = '"+userBio.getAddress_city()+"', " +
                        "address_zip = '"+userBio.getAddress_zip()+"', " +
                        "address_country = '"+userBio.getAddress_country()+"', " +
                        "date_birth = '"+userBio.getDate_birth()+"', " +
                        "gender = '"+userBio.getGender()+"' " +
                        "WHERE user_uuid = '" + userUUID + "';";

                conn.prepareStatement(updateBioSQL).executeUpdate();
                conn.commit();
                return 0;

            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
                System.err.println("Update editUserBio error - SQL");
                return 1;
            }
        } else
            System.err.println("Update editUserBio error - no user");
        return 2;

    }

    @Override
    public int editUserSetting(UUID userUUID, UserSetting userSetting) throws SQLException {
        final String sqlFirst = "SELECT * FROM users_setting WHERE user_uuid = '"+userUUID+"' ";

        List<UserSetting> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return new UserSetting(
                    UUID.fromString(resultSet.getString("id")),
                    UUID.fromString(resultSet.getString("user_uuid")),
                    resultSet.getBoolean("setting_public"),
                    resultSet.getString("setting_header1"),
                    resultSet.getString("setting_header2"),
                    resultSet.getString("setting_img"),
                    resultSet.getBoolean("setting_consent"),
                    resultSet.getBoolean("setting_allow_contact")
            );
        });
        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());

        if (!listFind.isEmpty()) {
            try {
                conn.setAutoCommit(false);

                final String updateUserSettingSQL = "UPDATE users_setting SET " +
                        "setting_public ='"+userSetting.isSetting_public()+"', " +
                        "setting_header1 = '"+userSetting.getSetting_header1()+"', " +
                        "setting_header2 = '"+userSetting.getSetting_header2()+"', " +
                        "setting_img = '"+userSetting.getSetting_img()+"', " +
                        "setting_consent = '"+userSetting.isSetting_consent()+"', " +
                        "setting_allow_contact = '"+userSetting.isSetting_allow_contact()+"' " +
                        "WHERE user_uuid = '" + userUUID + "';";

                conn.prepareStatement(updateUserSettingSQL).executeUpdate();
                conn.commit();
                return 0;

            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
                System.err.println("Update UserSetting error - SQL");
                return 1;
            }
        } else
            System.err.println("Update UserSetting error - no user");
        return 2;

    }

    @Override
    public EduData getEduData() {

        EduData eduData = new EduData();
        final String sqlEduType = "SELECT * FROM edu_type_data";
        final String sqlEduSpec = "SELECT * FROM edu_spec_data";

        eduData.setEduType(jdbcTemplate.queryForList(sqlEduType));
        eduData.setEduSpec(jdbcTemplate.queryForList(sqlEduSpec));

        return eduData;
    }

    @Override
    public WorkData getWorkData() {

        WorkData workData = new WorkData();
        final String sqlWorkIndustry = "SELECT * FROM work_industry_data";
        final String sqlWorkType = "SELECT * FROM work_type_data;";
        final String sqlWorkProfessions = "SELECT * FROM work_professions;";
        final String sqlLocations = "SELECT * FROM locations;";

        workData.setWorkIndustry(jdbcTemplate.queryForList(sqlWorkIndustry));
        workData.setWorkType(jdbcTemplate.queryForList(sqlWorkType));
        workData.setWorkProfessions(jdbcTemplate.queryForList(sqlWorkProfessions));
        workData.setLocations(jdbcTemplate.queryForList(sqlLocations));

        return workData;
    }

    @Override
    public SkillData getSkillData() {

        SkillData skillData = new SkillData();
        final String sqlSkillType = "SELECT * FROM skill_type_data";

        skillData.setSkillType(jdbcTemplate.queryForList(sqlSkillType));

        return skillData;
    }

//    Chat
    @Override
    public int createChat(UUID chatId, List<ChatMember> members) throws SQLException {

    Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
    conn.setAutoCommit(false);
    try {
        final String addChatSQL = "INSERT INTO Chats(id, chat_name) " +
                "VALUES (" +
                "'" + chatId + "', " +
                "'Konwersacja'" +
                ")";


        conn.prepareStatement(addChatSQL).executeUpdate();
        conn.commit();
        for (ChatMember member : members) {
            if (member != null) {
                addChatMember(chatId, member.getMemberId());
            }
        }

        return 1;
    } catch (SQLException e) {
        conn.rollback();
        e.printStackTrace();
        System.err.println("Add chat to database error.");
        return 0;
    }
}

    @Override
    public int sendMessage(Message message) throws SQLException {

        Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
        conn.setAutoCommit(false);
        try {
            final String addChatSQL = "INSERT INTO messages(chat_id, sender_id, message) " +
                    "VALUES (" +
                    "'" + message.getChatId() + "', " +
                    "'" + message.getSenderId() + "', " +
                    "'" + message.getMessage()+ "'" +
                    ")";

            System.err.println(addChatSQL);
            conn.prepareStatement(addChatSQL).executeUpdate();
            conn.commit();
            return 1;
        } catch (SQLException e) {
            conn.rollback();
            e.printStackTrace();
            System.err.println("Add message to database error.");
            return 0;
        }
    }

    @Override
    public int addChatMember(UUID chatId, UUID memberID) throws SQLException {
        final String sqlFirst = "SELECT * FROM chat_members WHERE chat_id = '" + chatId + "' AND member_id = '" + memberID + "'";

        List<UUID> listFind = jdbcTemplate.query(sqlFirst, (resultSet, i) -> {
            return UUID.fromString(resultSet.getString("id"));
        });
        if (listFind.isEmpty()) {
            Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
            conn.setAutoCommit(false);
            try {
                final String addChatSQL = "INSERT INTO chat_members(chat_id, member_id) " +
                        "VALUES (" +
                        "'" + chatId + "', " +
                        "'" + memberID + "'" +
                        ")";


                conn.prepareStatement(addChatSQL).executeUpdate();
                conn.commit();
                return 1;
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
                System.err.println("Add chat member to database error.");
                return 0;
            }
        } else
            return 0;
    }

    @Override
    public List<Message> getChatMessages(Chat chat) throws SQLException {
        final String sql = "SELECT * FROM messages WHERE chat_id = '" + chat.getId() + "'";

        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Message(
                    resultSet.getInt("id"),
                    UUID.fromString(resultSet.getString("chat_id")),
                    UUID.fromString(resultSet.getString("sender_id")),
                    resultSet.getString("message"),
                    Timestamp.valueOf(resultSet.getString("send_date"))
            );
        });
    }

    @Override
    public List<Message> getChatHeaders(UUID memberId) throws SQLException {
        final String sql = "Select DISTINCT on (chat_id)" +
                "id,chat_id, message, sender_id, send_date " +
                "from messages where " +
                "                                                                  chat_id in " +
                "                                                                  (select chat_id from chat_members where member_id ='" +
                memberId+
                "') " +
                "order by chat_id, send_date desc";

        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return new Message(
                    resultSet.getInt("id"),
                    UUID.fromString(resultSet.getString("chat_id")),
                    UUID.fromString(resultSet.getString("sender_id")),
                    resultSet.getString("message"),
                    Timestamp.valueOf(resultSet.getString("send_date"))
            );
        });
    }

    @Override
    public List<ChatMember> getChatMembers(Chat chat) throws SQLException {

        final String sql = "select member_id from chat_members where chat_id ='" +
                chat.getId() +
                "'";

        return jdbcTemplate.query(sql, (resultSet, i) -> {
            return new ChatMember(
                    null ,
                    null,
                    UUID.fromString(resultSet.getString("member_id"))
            );
        });

    }

    @Override
    public List<Map<String, Object>> getChats(UUID id) {
        final String sql = "SELECT c.id, cm.member_id, u.first_name, u.last_name, u.image FROM chats c\n" +
                "    INNER JOIN chat_members cm on c.id = cm.chat_id\n" +
                "    INNER JOIN users u on u.id = cm.member_id\n" +
                "WHERE c.id IN(\n" +
                "        SELECT c.id FROM chats c\n" +
                "            INNER JOIN chat_members cm on c.id = cm.chat_id\n" +
                "        WHERE cm.member_id = ?\n" +
                "    )\n" +
                "AND cm.member_id != ?";

        List<Map<String, Object>> chatsList = jdbcTemplate.queryForList(sql, id, id);

        return chatsList;
    }

    @Override
    public void deleteChat(UUID id) {
        final String sql1 = "DELETE FROM messages WHERE chat_id = ?";
        final String sql2 = "DELETE FROM chat_members WHERE chat_id = ?";
        final String sql3 = "DELETE FROM chats WHERE id = ?";

        jdbcTemplate.update(sql1, id);
        jdbcTemplate.update(sql2, id);
        jdbcTemplate.update(sql3, id);
    }
}
