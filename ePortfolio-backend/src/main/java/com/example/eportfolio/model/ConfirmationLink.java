package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

public class ConfirmationLink {
    @NotBlank @Getter @Setter private UUID id;
    @NotBlank @Getter @Setter private UUID user_uuid;
    @NotBlank @Getter @Setter private boolean status;
    @NotBlank @Getter @Setter private Timestamp time_stamp;

    public ConfirmationLink(@JsonProperty("id") UUID id,
                            @JsonProperty("user_uuid") UUID user_uuid,
                            @JsonProperty("status") boolean status,
                            @JsonProperty("time_stamp") Timestamp time_stamp) {
        this.id = id;
        this.user_uuid = user_uuid;
        this.status = status;
        this.time_stamp = time_stamp;
    }
}
