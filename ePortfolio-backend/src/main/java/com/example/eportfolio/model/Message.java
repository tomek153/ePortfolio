package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;
import java.util.UUID;

public class Message {
     private Integer id;
    private UUID chatId;
     private UUID senderId;
     private String message;
     private Timestamp send_date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UUID getChatId() {
        return chatId;
    }

    public void setChatId(UUID chatId) {
        this.chatId = chatId;
    }

    public UUID getSenderId() {
        return senderId;
    }

    public void setSenderId(UUID senderId) {
        this.senderId = senderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getSend_date() {
        return send_date;
    }

    public void setSend_date(Timestamp send_date) {
        this.send_date = send_date;
    }

    public Message(@JsonProperty("id") Integer id,
                   @JsonProperty("chatId") UUID chatId,
                   @JsonProperty("senderId") UUID senderId,
                   @JsonProperty("message") String message,
                   @JsonProperty("send_date") Timestamp send_date){
        this.id = id;
        this.chatId = chatId;
        this.senderId = senderId;
        this.message = message;
        if(send_date == null){
            send_date = new Timestamp(System.currentTimeMillis());
        }
        this.send_date = send_date;

    }
}