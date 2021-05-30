package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserSkill {

    private final UUID id;
    private final UUID userID;
    private final String skill_type;
    private final int skill_time_months;
    private final String skill_level;
    private final String skill_name;

    public UserSkill(@JsonProperty("id") UUID id,
                     @JsonProperty("userID") UUID userID,
                     @JsonProperty("type") String skill_type,
                     @JsonProperty("timeMonths") int skill_time_months,
                     @JsonProperty("level") String skill_level,
                     @JsonProperty("name") String skill_name) {
        this.id = id;
        this.userID = userID;
        this.skill_type = skill_type;
        this.skill_time_months = skill_time_months;
        this.skill_level = skill_level;
        this.skill_name = skill_name;

    }
}
