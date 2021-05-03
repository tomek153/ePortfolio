package com.example.eportfolio.api;
import com.auth0.jwt.interfaces.Claim;
import com.example.eportfolio.model.*;
import com.example.eportfolio.service.ChatService;
import com.example.eportfolio.service.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Member;
import java.sql.SQLException;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class ChatController {

    @Autowired
    private ChatService service;

    @RequestMapping(value = "/chat/send", method = POST)
    public void SendMessage(@Valid @NonNull @RequestParam String chatId, String senderId, String message, HttpServletResponse response) throws SQLException, IOException {
        System.out.println (chatId + "  " + senderId + "  " + message);
       int status = service.sendMessage(chatId,senderId,message);
        //int status = 0;

        if (status == 0) {
            System.out.println ("Sending message failure!");
            response.sendError (405, "Message not send");
        } else if (status == 1) {
            System.out.println ("Message sent!");
            response.sendError (200, "OK");
        }
    }

    @RequestMapping(value = "/chat/test", method = GET)
    public void test(HttpServletResponse response) throws IOException {
        response.sendError(200,"Ok");
    }

    @RequestMapping(value = "/chat/create", method = POST)
    public void CreateChat(@RequestParam List<String> membersId, HttpServletResponse response) throws SQLException, IOException {



        int status = service.addChat("Konwersacja", membersId);

        if (status == 0) {
            System.out.println ("Creating chat failure!");
            response.sendError (405, "Chat not created");
        } else if (status == 1) {
            System.out.println ("Chat created!");
            response.sendError (200, "OK");
        }
    }

    @RequestMapping (value = "/chat/get", method = GET)
    public List<Message> getMessages (@RequestParam String chatId, HttpServletRequest request) throws SQLException {

        return service.getChatMessages(chatId);
    }
}
