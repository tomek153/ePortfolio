package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserSetting {

    private final UUID id;
    private final UUID userID;
    private final boolean setting_public;
    private final String setting_header1;
    private final String setting_header2;
    private final String setting_img;
    private final boolean setting_consent;
    private final boolean setting_allow_contact;

    public UserSetting(@JsonProperty("id") UUID id,
                       @JsonProperty("userID") UUID userID,
                       @JsonProperty("public") boolean setting_public,
                       @JsonProperty("header1") String setting_header1,
                       @JsonProperty("header2") String setting_header2,
                       @JsonProperty("img") String setting_img,
                       @JsonProperty("consent") boolean setting_consent,
                       @JsonProperty("allow_contact") boolean setting_allow_contact) {
        this.id = id;
        this.userID = userID;
        this.setting_public = setting_public;
        this.setting_header1 = setting_header1;
        this.setting_header2 = setting_header2;
        this.setting_img = setting_img;
        this.setting_consent = setting_consent;
        this.setting_allow_contact = setting_allow_contact;
    }
}
