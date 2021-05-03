package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Chat {
    @NotBlank @Getter @Setter private java.util.UUID id;
    @NotBlank @Getter @Setter private String name;

    public Chat(@JsonProperty("id") UUID id,
                            @JsonProperty("name") String name){
        this.id = id;
        this.name= name;
    }
}