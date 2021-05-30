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

    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    List<User> getUsers();

    boolean checkUserExistByEmail(String email);

    User getUserByID(UUID id);

    Optional<UserBio> getUserBioByID(UUID id);

    List<UserWork> getUserWorkByID(UUID id);

    List<UserSkill> getUserSkillByID(UUID id);

    Optional<UserSetting> getUserSettingByID(UUID id);
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    int editUser(UUID userUUID, User user) throws SQLException;

    int editUserBio(UUID userUUID, UserBio userBio) throws SQLException;

    int editUserSetting(UUID userUUID, UserSetting userSetting) throws SQLException;

    int updateUserSkill(UUID userUUID, UserSkill userSkill) throws SQLException;
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    int deleteUser(UUID id) throws SQLException;

    int deleteUserWork(UUID id, UUID userId);

    int deleteUserEdu(UUID id, UUID userId);

    int deleteUserSkill(UUID id, UUID userId);
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    int changePassword(ResetPasswordRequest resetPasswordRequest);

    int resetPasswordRequest(String email);
    // CHANGE PASSWORD METHODS -END-


    // ADD USER PROPERTIES -START-
    int addUserWork(Map workMap, UUID id);

    int addUserEdu(Map addMap, UUID id);

    int addUserSkill(Map addMap, UUID id);
    // ADD USER PROPERTIES -END-

    UserProfileAll getUserProfileAll(UUID id) throws SQLException;
    List<UserEdu> getUserEdu(UUID id);

    int updateUserProfile(Map profile, UUID id) throws SQLException;

    int updateImage(String imageUrl, String imageSmallUrl, UUID userId) throws SQLException;

    List<UserSearching> getSearchingUsers(List<String> ids);

    UserSearchingAll getUserSearchingAll(UUID id);
}
