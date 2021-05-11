package com.example.eportfolio.dao;

import com.example.eportfolio.model.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


public interface UserDao {

    // ADD USER METHODS -START-
    int addUser(User user) throws SQLException;

//    default int addUser(User user) throws SQLException {
//        UUID id = UUID.randomUUID();
//        return addUser(id, user);
//    }
    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    List<User> getUsers();

    boolean checkUserExistByEmail(String email);

    User getUserByID(UUID id);

    Optional<UserBio> getUserBioByID(UUID id);

    List<UserWork> getUserWorkByID(UUID id);

    List<UserEdu> getUserEduByID(UUID id);

    List<UserSkill> getUserSkillByID(UUID id);

    Optional<UserSetting> getUserSettingByID(UUID id);
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    int editUser(UUID userUUID, User user) throws SQLException;

    int editUserBio(UUID userUUID, UserBio userBio) throws SQLException;

    int editUserSetting(UUID userUUID, UserSetting userSetting) throws SQLException;

    int updateUserWork(UUID userUUID, UserWork userWork) throws SQLException;

    int updateUserEdu(UUID userUUID, UserEdu userEdu) throws SQLException;

    int updateUserSkill(UUID userUUID, UserSkill userSkill) throws SQLException;
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    int deleteUser(UUID id) throws SQLException;

    int deleteUserWork(UUID userID, UUID propertyID) throws SQLException;

    int deleteUserEdu(UUID userID, UUID propertyID) throws SQLException;

    int deleteUserSkill(UUID userID, UUID propertyID) throws SQLException;
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

    UserProfileAll getUserProfileAll(UUID id) throws SQLException;

    int updateUserProfile(Map profile, UUID id) throws SQLException;

    int updateImage(String imageUrl, String imageSmallUrl, UUID userId) throws SQLException;
}
