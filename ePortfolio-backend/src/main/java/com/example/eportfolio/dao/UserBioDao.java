package com.example.eportfolio.dao;


import com.example.eportfolio.model.UserBio;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserBioDao {

    Optional<UserBio> getUserBioByID(UUID ID);

}