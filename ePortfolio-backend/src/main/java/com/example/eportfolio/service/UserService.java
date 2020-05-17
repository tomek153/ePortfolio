package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
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

    public int addUser(User user) {
        return userDao.addUser(user);
    }

    public List<User> getUsers() {
        return userDao.getUsers();
    }

    public int changePassword(User user){
        return userDao.changePassword(user);
    }

    public int resetPasswordRequest(User user){
        return userDao.resetPasswordRequest(user);
    }
    public Optional<User> getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }

    public Optional<User> getUserByID(UUID id) { return userDao.getUserByID(id); }

    public int deleteUser(String email) {
        return userDao.deleteUser(email);
    }

    public int updateUser(String email, User user) {
        return userDao.updateUser(email, user);
    }
}
