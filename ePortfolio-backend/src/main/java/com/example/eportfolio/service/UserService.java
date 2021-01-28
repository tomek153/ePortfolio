package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserDao userDao;

    public UserService(@Qualifier("postgres") UserDao userDao) {
        this.userDao = userDao;
    }

    // ADD USER METHODS -START-
    public int addUser(User user) {
        return userDao.addUser(user);
    }
    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    public List<User> getUsers() {
        return userDao.getUsers();
    }

    public boolean checkUserExistByEmail(String email) {
        return userDao.checkUserExistByEmail(email);
    }

    public Optional<User> getUserByID(UUID id) { return userDao.getUserByID(id); }

    public Optional<UserBio> getUserBioByID(UUID id) { return userDao.getUserBioByID(id); }

    public List<UserWork> getUserWorkByID(UUID id) { return userDao.getUserWorkByID(id); }

    public List<UserEdu> getUserEduByID(UUID id) { return userDao.getUserEduByID(id); }

    public List<UserSkill> getUserSkillByID(UUID id) { return userDao.getUserSkillByID(id); }

    public Optional<UserSetting> getUserSettingByID(UUID id) { return userDao.getUserSettingByID(id); }
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    public int updateUser(String email, User user) {
        return userDao.updateUser(email, user);
    }

    public int updateUserBio(UUID id, UserBio userBio) { return userDao.updateUserBio(id, userBio); }
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    public int deleteUser(UUID id) throws SQLException { return userDao.deleteUser(id); }
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    public int changePassword(ResetPasswordRequest resetPasswordRequest){
        return userDao.changePassword(resetPasswordRequest);
    }

    public int resetPasswordRequest(String email){
        return userDao.resetPasswordRequest(email);
    }
    // CHANGE PASSWORD METHODS -END-

}
