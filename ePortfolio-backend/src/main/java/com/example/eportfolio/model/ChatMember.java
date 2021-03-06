package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public class ChatMember {
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private UUID chatId;
    @Getter
    @Setter
    private UUID memberId;

    public ChatMember(@JsonProperty("id") Integer id,
                      @JsonProperty("chatId") UUID chatId,
                      @JsonProperty("memberId") UUID memberId) {
        this.id = id;
        this.chatId = chatId;
        this.memberId = memberId;
    }
}