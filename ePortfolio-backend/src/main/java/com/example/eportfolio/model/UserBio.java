package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserBio {

    private final UUID id;
    private final UUID userID;
    private final String phone;
    private final String address_main;
    private final String address_city;
    private final String address_zip;
    private final String address_country;
    private final String date_birth;
    private final String gender;

    public UserBio(@JsonProperty("id") UUID id,
                   @JsonProperty("userID") UUID userID,
                   @JsonProperty("phone") String phone,
                   @JsonProperty("address") String address_main,
                   @JsonProperty("city") String address_city,
                   @JsonProperty("zip") String address_zip,
                   @JsonProperty("country") String address_country,
                   @JsonProperty("dateBirth") String date_birth,
                   @JsonProperty("gender") String gender) {
        this.id = id;
        this.userID = userID;
        this.phone = phone;
        this.address_main = address_main;
        this.address_city = address_city;
        this.address_zip = address_zip;
        this.address_country = address_country;
        this.date_birth = date_birth;
        this.gender = gender;
    }
}
