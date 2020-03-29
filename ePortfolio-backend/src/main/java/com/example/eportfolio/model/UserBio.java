package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserBio {

    private final UUID id;
    private final String phone;
    private final String address_main;
    private final String address_city;
    private final String address_zip;
    private final String address_country;
    private final String date_birth;

    public UserBio(@JsonProperty("user_uuid") UUID id,
                   @JsonProperty("phone") String phone,
                   @JsonProperty("address_main") String address_main,
                   @JsonProperty("address_city") String address_city,
                   @JsonProperty("address_zip") String address_zip,
                   @JsonProperty("address_country") String address_country,
                   @JsonProperty("date_birth") String date_birth) {
        this.id = id;
        this.phone = phone;
        this.address_main = address_main;
        this.address_city = address_city;
        this.address_zip = address_zip;
        this.address_country = address_country;
        this.date_birth = date_birth;
    }

    public UUID getUserBioId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress_main() {
        return address_main;
    }

    public String getAddress_city() {
        return address_city;
    }

    public String getAddress_zip() {
        return address_zip;
    }

    public String getAddress_country() {
        return address_country;
    }

    public String getDate_birth() {
        return date_birth;
    }
}
