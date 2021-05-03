package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class ChatMember {
    @NotBlank @Getter @Setter private Integer id;
    @NotBlank @Getter @Setter private java.util.UUID chatId;
    @NotBlank @Getter @Setter private java.util.UUID memberId;

    public ChatMember(@JsonProperty("id") Integer id,
                      @JsonProperty("chatId") UUID chatId,
                      @JsonProperty("memberId") UUID memberId){
        this.id = id;
        this.chatId = chatId;
        this.memberId = memberId;
    }
}