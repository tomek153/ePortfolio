package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserSkill {

    private final UUID id;
    private final int skill_type;
    private final int skill_time_months;
    private final int skill_level;
    private final String skill_name;

    public UserSkill(@JsonProperty("id") UUID id,
                     @JsonProperty("type") int skill_type,
                     @JsonProperty("timeMonths") int skill_time_months,
                     @JsonProperty("level") int skill_level,
                     @JsonProperty("name") String skill_name) {
        this.id = id;
        this.skill_type = skill_type;
        this.skill_time_months = skill_time_months;
        this.skill_level = skill_level;
        this.skill_name = skill_name;

    }

    public UUID getUserBioId() {
        return id;
    }

    public int getSkill_type() {
        return skill_type;
    }

    public int getSkill_time_months() {
        return skill_time_months;
    }

    public int getSkill_level() {
        return skill_level;
    }

    public String getSkill_name() {
        return skill_name;
    }
}
