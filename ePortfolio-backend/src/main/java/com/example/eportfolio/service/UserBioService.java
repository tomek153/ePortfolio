package com.example.eportfolio.service;

import com.example.eportfolio.dao.UserBioDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.example.eportfolio.model.UserBio;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserBioService {

    private final UserBioDao userBioDao;

    public UserBioService(@Qualifier("postgresUserBio") UserBioDao userBioDao) {
        this.userBioDao = userBioDao;
    }

    public Optional<UserBio> getUserBioByID(UUID id) {
        return userBioDao.getUserBioByID(id);
    }

    public int updateUserBioById(UUID id, UserBio user) {
        return userBioDao.updateUserBioByID(id, user);
    }

}
