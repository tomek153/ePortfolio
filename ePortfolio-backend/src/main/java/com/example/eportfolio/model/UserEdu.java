package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserEdu {

    private final UUID id;
    private final int edu_spec;
    private final int edu_type;
    private final String edu_name;
    private final String edu_time_start;
    private final String edu_time_end;
    private final String edu_place;
    private final String edu_desc;

    public UserEdu(@JsonProperty("id") UUID id,
                   @JsonProperty("spec") int edu_spec,
                   @JsonProperty("type") int edu_type,
                   @JsonProperty("name") String edu_name,
                   @JsonProperty("timeStart") String edu_time_start,
                   @JsonProperty("timeEnd") String edu_time_end,
                   @JsonProperty("place") String edu_place,
                   @JsonProperty("desc") String edu_desc) {
        this.id = id;
        this.edu_spec = edu_spec;
        this.edu_type = edu_type;
        this.edu_name = edu_name;
        this.edu_time_start = edu_time_start;
        this.edu_time_end = edu_time_end;
        this.edu_place = edu_place;
        this.edu_desc = edu_desc;
    }

    public UUID getUserBioId() {
        return id;
    }

    public int getEdu_spec() {
        return edu_spec;
    }

    public int getEdu_type() {
        return edu_type;
    }

    public String getEdu_name() {
        return edu_name;
    }

    public String getEdu_time_start() {
        return edu_time_start;
    }

    public String getEdu_time_end() {
        return edu_time_end;
    }

    public String getEdu_place() {
        return edu_place;
    }

    public String getEdu_desc() {
        return edu_desc;
    }
}
