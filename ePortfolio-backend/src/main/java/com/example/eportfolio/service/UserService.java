package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.ResetPasswordRequest;
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

    public int changePassword(ResetPasswordRequest resetPasswordRequest){
        return userDao.changePassword(resetPasswordRequest);
    }

    public int resetPasswordRequest(String email){
        return userDao.resetPasswordRequest(email);
    }
    public boolean checkUserExistByEmail(String email) {
        return userDao.checkUserExistByEmail(email);
    }

    public Optional<User> getUserByID(UUID id) { return userDao.getUserByID(id); }

    public int deleteUser(UUID id) {
        return userDao.deleteUser(id);
    }

    public int updateUser(String email, User user) {
        return userDao.updateUser(email, user);
    }
}
