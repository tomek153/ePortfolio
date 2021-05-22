package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserBio {

    private UUID id;
    private UUID userID;
    private final String phone;
    private final String address_main;
    private final String address_city;
    private final String address_zip;
    private final String address_country;
    private final String date_birth;
    private final String gender;
    private String image;

    public UserBio(@JsonProperty("id") UUID id,
                   @JsonProperty("userID") UUID userID,
                   @JsonProperty("phone") String phone,
                   @JsonProperty("address") String address_main,
                   @JsonProperty("city") String address_city,
                   @JsonProperty("zip") String address_zip,
                   @JsonProperty("country") String address_country,
                   @JsonProperty("dateBirth") String date_birth,
                   @JsonProperty("gender") String gender,
                   @JsonProperty("image") String image) {
        this.id = id;
        this.userID = userID;
        this.phone = phone;
        this.address_main = address_main;
        this.address_city = address_city;
        this.address_zip = address_zip;
        this.address_country = address_country;
        this.date_birth = date_birth;
        this.gender = gender;
        this.image = image;
    }
    public UserBio(UUID id,
                   UUID userID,
                   String phone,
                   String address_main,
                   String address_city,
                   String address_zip,
                   String address_country,
                   String date_birth,
                   String gender) {
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

    public UserBio(String phone,
                   String address_main,
                   String address_city,
                   String address_zip,
                   String address_country,
                   String date_birth,
                   String gender,
                   String image) {
        this.phone = phone;
        this.address_main = address_main;
        this.address_city = address_city;
        this.address_zip = address_zip;
        this.address_country = address_country;
        this.date_birth = date_birth;
        this.gender = gender;
        this.image = image;
    }
}
