package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserWork {

    private final UUID id;
    private final int work_industry;
    private final int work_type;
    private final String work_name;
    private final String work_time_start;
    private final String work_time_end;
    private final String work_place;
    private final String work_desc;
    private final String work_location;

    public UserWork(@JsonProperty("id") UUID id,
                    @JsonProperty("industry") int work_industry,
                    @JsonProperty("type") int work_type,
                    @JsonProperty("name") String work_name,
                    @JsonProperty("timeStart") String work_time_start,
                    @JsonProperty("timeEnd") String work_time_end,
                    @JsonProperty("place") String work_place,
                    @JsonProperty("desc") String work_desc,
                    @JsonProperty("location") String work_location) {
        this.id = id;
        this.work_industry = work_industry;
        this.work_type = work_type;
        this.work_name = work_name;
        this.work_time_start = work_time_start;
        this.work_time_end = work_time_end;
        this.work_place = work_place;
        this.work_desc = work_desc;
        this.work_location = work_location;
    }

    public UUID getUserWorkId() {
        return id;
    }

    public int getWork_industry() {
        return work_industry;
    }

    public int getWork_type() {
        return work_type;
    }

    public String getWork_name() {
        return work_name;
    }

    public String getWork_time_start() {
        return work_time_start;
    }

    public String getWork_time_end() {
        return work_time_end;
    }

    public String getWork_place() {
        return work_place;
    }

    public String getWork_desc() {
        return work_desc;
    }

    public String getWork_location() {
        return work_location;
    }
}
