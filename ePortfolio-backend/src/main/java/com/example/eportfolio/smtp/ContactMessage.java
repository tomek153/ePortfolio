package com.example.eportfolio.model;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.UUID;


public class ContactMessage {


    @NotBlank
    private String firstName;
    @NotBlank
    private String email;
    @NotBlank
    private String message;

    public ContactMessage(@JsonProperty("name") String firstName,
                            @JsonProperty("email") String email,
                            @JsonProperty("message") String message ){
        this.firstName = firstName;
        this.email = email;
        this.message = message;
    }
    public String getFirstName() {
        return firstName;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
