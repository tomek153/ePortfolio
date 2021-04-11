package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserEdu {

    private final UUID id;
    private final UUID userID;
    private final int edu_spec;
    private final int edu_type;
    private final String edu_name;
    private final String edu_time_start;
    private final String edu_time_end;
    private final String edu_place;
    private final String edu_desc;

    public UserEdu(@JsonProperty("id") UUID id,
                   @JsonProperty("userID") UUID userID,
                   @JsonProperty("spec") int edu_spec,
                   @JsonProperty("type") int edu_type,
                   @JsonProperty("name") String edu_name,
                   @JsonProperty("timeStart") String edu_time_start,
                   @JsonProperty("timeEnd") String edu_time_end,
                   @JsonProperty("place") String edu_place,
                   @JsonProperty("desc") String edu_desc) {
        this.id = id;
        this.userID = userID;
        this.edu_spec = edu_spec;
        this.edu_type = edu_type;
        this.edu_name = edu_name;
        this.edu_time_start = edu_time_start;
        this.edu_time_end = edu_time_end;
        this.edu_place = edu_place;
        this.edu_desc = edu_desc;
    }
}
