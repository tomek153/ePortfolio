package com.example.eportfolio.dao;

import com.example.eportfolio.model.*;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;


public interface ChatDao{

    // ADD DATA METHODS -START-
    int createChat(UUID chatId, String name, List<String> members) throws SQLException;

    default int createChat(String name, List<String> members) throws SQLException {
        UUID chatId = UUID.randomUUID();
        return createChat(chatId, name, members);
    }

    int sendMessage(String chatId, String senderId, String message) throws SQLException;

    int addChatMember(UUID chatId, UUID memberID) throws SQLException;

    // ADD DATA METHODS -END-

    // GET DATA METHODS -START-

    List<Message> getChatMessages(String chatId) throws SQLException;

    int getChatHeaders(UUID memberId) throws SQLException;

    int getChatMembers(UUID chatId) throws SQLException;

    // GET DATA METHODS -END-

}
