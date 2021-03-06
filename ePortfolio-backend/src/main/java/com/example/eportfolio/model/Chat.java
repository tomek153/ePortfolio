package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public class Chat {
    @Getter @Setter private UUID id;
    @Getter @Setter private String name;

    public Chat(@JsonProperty("id") UUID id,
                            @JsonProperty("name") String name){
        this.id = id;
        this.name= name;
    }
}