package com.example.eportfolio.api;

import com.example.eportfolio.model.Chat;
import com.example.eportfolio.model.ChatMember;
import com.example.eportfolio.model.Message;
import com.example.eportfolio.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class ChatController {

    @Autowired
    private ChatService service;

//Ex.
//    POST /chat/send HTTP/1.1
//    Host: localhost:8080
//    Content-Type: application/json
//    Content-Length: 217
//
//    {
//        "id": 1,
//            "chatId": "b944aaee-30b8-4560-aefb-164078f90ea2",
//            "senderId": "65593dc1-d6cf-446c-96c8-0eabfe1f39b1",
//            "message": "Wiadomosctestowa z dzisiaj",
//            "send_date": ""
//
//    }
    @RequestMapping(value = "/chat/send", method = POST)
    public void SendMessage(@Valid @RequestBody Message message, HttpServletResponse response) throws SQLException, IOException {
       int status = service.sendMessage(message);
        if (status == 0) {
            System.out.println ("Sending message failure!");
            response.sendError (405, "Message not send");
        } else if (status == 1) {
            System.out.println ("Message sent!");
            response.sendError (200, "OK");
        }
    }

//Ex.
//    POST /chat/create HTTP/1.1
//    Host: localhost:8080
//    Content-Type: application/json
//    Content-Length: 232
//
//            [
//    {
//        "id":"",
//            "chatId":"",
//            "memberId":"65593dc1-d6cf-446c-96c8-0eabfe1f39b1"
//    },
//    {
//
//        "id":"",
//            "chatId":"",
//            "memberId":"68d7f3a6-8c2f-4ae5-bef3-9eaa26f1f321"
//    }
//
//]
    @RequestMapping(value = "/chat/create", method = POST)
    public void CreateChat(@Valid @RequestBody List<ChatMember> members, HttpServletResponse response) throws SQLException, IOException {

        int status = service.addChat(members);
        //int status = 0;

        if (status == 0) {
            System.out.println ("Creating chat failure!");
            response.sendError (405, "Chat not created");
        } else if (status == 1) {
            System.out.println ("Chat created!");
            response.sendError (200, "OK");
        }
    }

//Ex.
//    GET /chat/get HTTP/1.1
//    Host: localhost:8080
//    Content-Type: application/json
//    Content-Length: 68
//
//    {
//        "id":"b944aaee-30b8-4560-aefb-164078f90ea2",
//            "name":""
//    }
    @RequestMapping (value = "/chat/get", method = POST)
    public List<Message> getMessages (@Valid @RequestBody Chat chat, HttpServletRequest request) throws SQLException {
        return service.getChatMessages(chat);
    }


//Ex.
//    GET /chat/getHeaders HTTP/1.1
//    Host: localhost:8080
//    Content-Type: application/json
//    Content-Length: 104
//
//    {
//        "id":"",
//            "chatId":"",
//            "memberId":"65593dc1-d6cf-446c-96c8-0eabfe1f39b1"
//    }
    @RequestMapping (value = "/chat/getHeaders", method = GET)
    public List<Message> getHeaders (@Valid @RequestBody ChatMember member, HttpServletRequest request) throws SQLException {
        return service.getChatHeaders(member);
    }

//Ex.
//    GET /chat/getMembers HTTP/1.1
//    Host: localhost:8080
//    Content-Type: application/json
//    Content-Length: 66
//
//    {
//        "id":"b944aaee-30b8-4560-aefb-164078f90ea2",
//            "name":""
//    }
    @RequestMapping (value = "/chat/getMembers", method = POST)
    public List<ChatMember> getHeaders (@Valid @RequestBody Chat chat, HttpServletRequest request) throws SQLException {
        return service.getChatMembers(chat);
    }

    @RequestMapping (value = "/chat/getChatsById/{id}", method = GET)
    public List<Map<String, Object>> getChats(@PathVariable("id") UUID id, HttpServletRequest request) {
        return service.getChats(id);
    }

    @RequestMapping (value = "/chat/delete/{id}", method = DELETE)
    public void deleteChat(@PathVariable("id") UUID id, HttpServletRequest request) {
        service.deleteChat(id);
    }

}
