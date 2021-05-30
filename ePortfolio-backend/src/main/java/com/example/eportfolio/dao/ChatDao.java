package com.example.eportfolio.dao;

import com.example.eportfolio.model.Chat;
import com.example.eportfolio.model.ChatMember;
import com.example.eportfolio.model.Message;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;


public interface ChatDao {

    // ADD DATA METHODS -START-
    int createChat(UUID chatId, List<ChatMember> members) throws SQLException;

    default int createChat(List<ChatMember> members) throws SQLException {
        UUID chatId = UUID.randomUUID();
        return createChat(chatId, members);
    }

    int sendMessage(Message message) throws SQLException;

    int addChatMember(UUID chatId, UUID memberID) throws SQLException;

    // ADD DATA METHODS -END-

    // GET DATA METHODS -START-

    List<Message> getChatMessages(Chat chat) throws SQLException;

    List<Message> getChatHeaders(UUID memberId) throws SQLException;

    List<ChatMember> getChatMembers(Chat chat) throws SQLException;

    // GET DATA METHODS -END-

    List<Map<String, Object>> getChats(UUID id);

    void deleteChat(UUID id);
}
