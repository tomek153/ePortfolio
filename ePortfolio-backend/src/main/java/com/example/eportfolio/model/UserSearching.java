package com.example.eportfolio.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSearching {
    private UUID id;
    private String first_name;
    private String last_name;
    private String image;
    private String address_city;
    private String work_place;
    private String work_profession;
}
