package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;


public class FixedData {
    private final int id;
    @NotBlank
    private final String name;

    @NotBlank

    public FixedData(@JsonProperty("id") int id,
                     @JsonProperty("firstName") String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
