package com.example.eportfolio.dao;

import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.model.UserWork;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserDao {

    // ADD USER METHODS -START-
    int addUser(UUID id, User user);

    default int addUser(User user) {
        UUID id = UUID.randomUUID();
        return addUser(id, user);
    }
    // ADD USER METHODS -END-

    // GET USER METHODS -START-
    List<User> getUsers();

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByID(UUID id);

    Optional<UserBio> getUserBioByID(UUID id);

    List<UserWork> getUserWorkByID(UUID id);
    // GET USER METHODS -END-

    // EDIT USER METHODS -START-
    int updateUser(String email, User user);

    int updateUserBio(UUID id, UserBio userBio);
    // EDIT USER METHODS -END-

    // DELETE USER METHODS -START-
    int deleteUser(UUID id);
    // DELETE USER METHODS -END-

    // CHANGE PASSWORD METHODS -START-
    int changePassword(User user);

    int resetPasswordRequest(User user);
    // CHANGE PASSWORD METHODS -END-

}
