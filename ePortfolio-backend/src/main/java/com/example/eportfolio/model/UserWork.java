package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserWork {

    private final UUID id;
    private final UUID userID;
    private final String work_industry;
    private final String work_type;
    private final String work_name;
    private final String work_time_start;
    private final String work_time_end;
    private final String work_place;
    private final String work_desc;
    private final String work_profession;

    public UserWork(@JsonProperty("id") UUID id,
                    @JsonProperty("user_id") UUID userID,
                    @JsonProperty("industry") String work_industry,
                    @JsonProperty("type") String work_type,
                    @JsonProperty("name") String work_name,
                    @JsonProperty("time_start") String work_time_start,
                    @JsonProperty("time_end") String work_time_end,
                    @JsonProperty("place") String work_place,
                    @JsonProperty("desc") String work_desc,
                    @JsonProperty("work_profession") String work_profession) {
        this.id = id;
        this.userID = userID;
        this.work_industry = work_industry;
        this.work_type = work_type;
        this.work_name = work_name;
        this.work_time_start = work_time_start;
        this.work_time_end = work_time_end;
        this.work_place = work_place;
        this.work_desc = work_desc;
        this.work_profession = work_profession;
    }
}
