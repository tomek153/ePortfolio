package com.example.eportfolio.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class UserSearchingAll {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address_main;
    private String address_city;
    private String address_zip;
    private String address_country;
    private String date_birth;
    private String gender;
    private String image;
    private List<UserEdu> userEduList;
    private List<UserWork> userWorkList;
    private List<UserSkill> userSkillList;
}
