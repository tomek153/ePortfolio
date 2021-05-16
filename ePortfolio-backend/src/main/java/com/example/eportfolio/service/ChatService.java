package com.example.eportfolio.service;


import com.example.eportfolio.dao.ChatDao;
import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.print.DocFlavor;
import java.lang.reflect.Member;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChatService {

    private final ChatDao chatDao;

    public ChatService(@Qualifier("postgres") ChatDao chatDao){this.chatDao = chatDao;}
    // GET CHAT METHODS -START-

    public List<Message> getChatMessages(Chat chat) throws SQLException {
        return chatDao.getChatMessages(chat);
    }

    public List<Message> getChatHeaders(ChatMember member) throws SQLException {
        return chatDao.getChatHeaders(member.getMemberId());
    }

    public List<ChatMember> getChatMembers(Chat chat) throws SQLException {
        return chatDao.getChatMembers(chat);
    }
    // GET CHAT METHODS -END-

    // ADD CHAT METHODS -START-

    public int addChat(List<ChatMember> members) throws SQLException {
        return chatDao.createChat(members);
    }

    public int sendMessage(Message message) throws SQLException {
        return chatDao.sendMessage(message);
    }

    // ADD CHAT METHODS -END-
}

