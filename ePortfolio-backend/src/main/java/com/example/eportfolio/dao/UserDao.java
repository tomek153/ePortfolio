package com.example.eportfolio.dao;

import com.example.eportfolio.model.ResetPasswordRequest;
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

    int changePassword(ResetPasswordRequest resetPasswordRequest);

    boolean checkUserExistByEmail(String email);

    int resetPasswordRequest(String email);

    Optional<User> getUserByID(UUID id);

    int deleteUser(UUID id);

    int updateUser(String email, User user);

}
