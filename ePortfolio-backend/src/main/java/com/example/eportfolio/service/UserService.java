package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.model.UserWork;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
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

    public Optional<User> getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }

    public Optional<User> getUserByID(UUID id) { return userDao.getUserByID(id); }

    public Optional<UserBio> getUserBioByID(UUID id) { return userDao.getUserBioByID(id); }

    public List<UserWork> getUserWorkByID(UUID id) { return userDao.getUserWorkByID(id); }
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    public int updateUser(String email, User user) {
        return userDao.updateUser(email, user);
    }

    public int updateUserBio(UUID id, UserBio userBio) { return userDao.updateUserBio(id, userBio); }
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    public int deleteUser(UUID id) {
        return userDao.deleteUser(id);
    }
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    public int changePassword(User user){
        return userDao.changePassword(user);
    }

    public int resetPasswordRequest(User user){
        return userDao.resetPasswordRequest(user);
    }
    // CHANGE PASSWORD METHODS -END-

}
