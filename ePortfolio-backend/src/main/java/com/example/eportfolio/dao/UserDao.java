package com.example.eportfolio.dao;

import com.example.eportfolio.model.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface UserDao {

    // ADD USER METHODS -START-
    int addUser(UUID id, User user) throws SQLException;

    default int addUser(User user) throws SQLException {
        UUID id = UUID.randomUUID();
        return addUser(id, user);
    }
    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    List<User> getUsers();

    boolean checkUserExistByEmail(String email);

    Optional<User> getUserByID(UUID id);

    Optional<UserBio> getUserBioByID(UUID id);

    List<UserWork> getUserWorkByID(UUID id);

    List<UserEdu> getUserEduByID(UUID id);

    List<UserSkill> getUserSkillByID(UUID id);

    Optional<UserSetting> getUserSettingByID(UUID id);
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    int updateUser(String email, User user);

    int updateUserBio(UUID id, UserBio userBio);
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    int deleteUser(UUID id) throws SQLException;
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    int changePassword(ResetPasswordRequest resetPasswordRequest);

    int resetPasswordRequest(String email);
    // CHANGE PASSWORD METHODS -END-


    // ADD USER PROPERTIES -START-
    int addUserWork(UUID id, UserWork userWork) throws SQLException;

    int addUserEdu(UUID id, UserEdu userEdu) throws SQLException;

    int addUserSkill(UUID id, UserSkill userSkill) throws SQLException;
    // ADD USER PROPERTIES -END-
}
