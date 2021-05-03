package com.example.eportfolio.service;


import com.example.eportfolio.dao.ChatDao;
import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChatService {

    private final ChatDao chatDao;

    public ChatService(@Qualifier("postgres") ChatDao chatDao){this.chatDao = chatDao;}
    // GET CHAT METHODS -START-

    public List<Message> getChatMessages(String chatId) throws SQLException {
        return chatDao.getChatMessages(chatId);
    }


    // GET CHAT METHODS -END-

    // ADD CHAT METHODS -START-

    public int addChat(String name, List<String> members) throws SQLException {
        return chatDao.createChat(name,members);
    }

    public int sendMessage(String chatId, String senderId, String message) throws SQLException {
        return chatDao.sendMessage(chatId,senderId,message);
    }

    // ADD CHAT METHODS -END-
}

