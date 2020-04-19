package com.example.eportfolio.dao;

import com.example.eportfolio.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {

    int addUser(UUID id, User user);

    default int addUser(User user) {
        UUID id = UUID.randomUUID();
        return addUser(id, user);
    }

    List<User> getUsers();

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByID(UUID id);

    int deleteUser(String email);

    int updateUser(UUID id, User user);

}
