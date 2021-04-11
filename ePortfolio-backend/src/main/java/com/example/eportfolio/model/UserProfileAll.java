package com.example.eportfolio.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserProfileAll {
    private String firstName;
    private String lastName;
    private String email;
    private String image;
    private String phone;
    private String address_main;
    private String address_city;
    private String address_zip;
    private String address_country;
    private String date_birth;
    private String gender;
    private boolean setting_public;
    private String setting_header1;
    private String setting_header2;
    private List<UserEdu> userEduList;
    private List<UserWork> userWorkList;
    private List<UserSkill> userSkillList;


    public UserProfileAll(String firstName,
                          String lastName,
                          String email,
                          String image,
                          String phone,
                          String address_main,
                          String address_city,
                          String address_zip,
                          String address_country,
                          String date_birth,
                          String gender,
                          boolean setting_public,
                          String setting_header1,
                          String setting_header2) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image = image;
        this.phone = phone;
        this.address_main = address_main;
        this.address_city = address_city;
        this.address_zip = address_zip;
        this.address_country = address_country;
        this.date_birth = date_birth;
        this.gender = gender;
        this.setting_public = setting_public;
        this.setting_header1 = setting_header1;
        this.setting_header2 = setting_header2;
    }
}