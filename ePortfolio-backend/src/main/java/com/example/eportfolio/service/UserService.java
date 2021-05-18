package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;

    public UserService(@Qualifier("postgres") UserDao userDao) {
        this.userDao = userDao;
    }

    // ADD USER METHODS -START-
    public int addUser(User user) throws SQLException { return userDao.addUser(user); }
    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    public List<User> getUsers() {
        return userDao.getUsers();
    }

    public boolean checkUserExistByEmail(String email) {
        return userDao.checkUserExistByEmail(email);
    }

    public User getUserByID(UUID id) { return userDao.getUserByID(id); }

    public Optional<UserBio> getUserBioByID(UUID id) { return userDao.getUserBioByID(id); }

    public List<UserWork> getUserWorkByID(UUID id) { return userDao.getUserWorkByID(id); }

    public List<UserEdu> getUserEduByID(UUID id) { return userDao.getUserEduByID(id); }

    public List<UserSkill> getUserSkillByID(UUID id) { return userDao.getUserSkillByID(id); }

    public Optional<UserSetting> getUserSettingByID(UUID id) { return userDao.getUserSettingByID(id); }
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    public int editUser(UUID userUUID, User user) throws SQLException {
        return userDao.editUser(userUUID, user);
    }

    public int editUserBio(UUID userUUID, UserBio userBio) throws SQLException {
        return userDao.editUserBio(userUUID, userBio);
    }

    public int editUserSetting(UUID userUUID, UserSetting userSetting) throws SQLException {
        return userDao.editUserSetting(userUUID, userSetting);
    }

    public int updateUserSkill(UUID userUUID, UserSkill userSkill) throws SQLException {
        return userDao.updateUserSkill(userUUID, userSkill);
    }
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    public int deleteUser(UUID id) throws SQLException { return userDao.deleteUser(id); }

    public int deleteUserWork(UUID userID, UUID propertyID) throws SQLException { return userDao.deleteUserWork(userID, propertyID); }

    public int deleteUserEdu(UUID userID, UUID propertyID) throws SQLException { return userDao.deleteUserEdu(userID, propertyID); }

    public int deleteUserSkill(UUID userID, UUID propertyID) throws SQLException { return userDao.deleteUserSkill(userID, propertyID); }
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    public int changePassword(ResetPasswordRequest resetPasswordRequest){
        return userDao.changePassword(resetPasswordRequest);
    }

    public int resetPasswordRequest(String email){
        return userDao.resetPasswordRequest(email);
    }
    // CHANGE PASSWORD METHODS -END-

    // ADD USER PROPERTIES -START-
    public int addUserWork(UUID id, UserWork userWork) throws SQLException { return userDao.addUserWork(id, userWork); }

    public int addUserEdu(Map addMap, UUID id) { return userDao.addUserEdu(addMap, id); }

    public int addUserSkill(UUID id, UserSkill userSkill) throws SQLException { return userDao.addUserSkill(id, userSkill); }
    // ADD USER PROPERTIES -END-

    public UserProfileAll getUserProfileAll(UUID id) throws SQLException { return userDao.getUserProfileAll(id); }
    public List<UserEdu> getUserEdu(UUID id) { return userDao.getUserEdu(id); }

    public int updateImage(String imageUrl, String imageSmallUrl, UUID userId) throws SQLException { return userDao.updateImage(imageUrl, imageSmallUrl, userId); }

    public int updateUserProfile(Map profile, UUID id) throws SQLException { return userDao.updateUserProfile(profile, id); }
}
