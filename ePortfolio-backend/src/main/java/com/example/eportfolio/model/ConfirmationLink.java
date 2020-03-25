package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.UUID;

public class ConfirmationLink {
    private UUID id;
    @NotBlank
    private UUID user_uuid;
    @NotBlank
    private boolean status;
    @NotBlank
    private LocalDateTime time_stamp;

    public ConfirmationLink(@JsonProperty("id") UUID id,
                            @JsonProperty("user_uuid") UUID user_uuid,
                            @JsonProperty("status") boolean status,
                            @JsonProperty("time_stamp") LocalDateTime time_stamp) {
        this.id = id;
        this.user_uuid = user_uuid;
        this.status = status;
        this.time_stamp = time_stamp;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUser_uuid() {
        return user_uuid;
    }

    public void setUser_uuid(UUID user_uuid) {
        this.user_uuid = user_uuid;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getTime_stamp() {
        return time_stamp;
    }

    public void setTime_stamp(LocalDateTime time_stamp) {
        this.time_stamp = time_stamp;
    }
}
