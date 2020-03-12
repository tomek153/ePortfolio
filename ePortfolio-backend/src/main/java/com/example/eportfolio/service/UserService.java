package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<User> getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }

    public int deleteUser(String email) {
        return userDao.deleteUser(email);
    }

    public int updateUser(String email, User user) {
        return userDao.updateUser(email, user);
    }
}
