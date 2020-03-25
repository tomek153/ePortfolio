package com.example.eportfolio.smtp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MailRequestModel {

    @NotBlank
    private String name;
    @NotBlank
    private String to;
    @NotBlank
    private String from;
    @NotBlank
    private String subject;

    public MailRequestModel(@JsonProperty("name") String name,
                            @JsonProperty("to") String to,
                            @JsonProperty("from") String from,
                            @JsonProperty("subject") String subject) {
        this.name = name;
        this.to = to;
        this.from = from;
        this.subject = subject;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
