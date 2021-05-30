package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Setter
@Getter
public class User {
    private UUID id;
    private String firstName;
    private String lastName;
    private final String email;
    private String password;
    private String image;
    private String role;
    private boolean confirmed;

    public User(@JsonProperty("id") UUID id,
                @JsonProperty("firstName") String firstName,
                @JsonProperty("lastName") String lastName,
                @JsonProperty("email") String email,
                @JsonProperty("password") String password,
                @JsonProperty("image") String image,
                @JsonProperty("role") String role,
                @JsonProperty("confirmed") boolean confirmed) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.image = image;
        this.role = role;
        this.confirmed = confirmed;
    }
    public User(UUID id,
                String firstName,
                String lastName,
                String email,
                String image,
                String role,
                boolean confirmed) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image = image;
        this.role = role;
        this.confirmed = confirmed;
    }
    public User(UUID id,
                String firstName,
                String lastName,
                String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
