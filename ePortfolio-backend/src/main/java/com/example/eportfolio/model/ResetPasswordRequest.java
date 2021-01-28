package com.example.eportfolio.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class ResetPasswordRequest {

    @NonNull @Getter @Setter private UUID id;
    @NonNull @Getter @Setter private UUID user_uuid;
    @NonNull @Getter @Setter private String password;

    public ResetPasswordRequest(@JsonProperty("linkId") UUID id,
                                @JsonProperty("userId") UUID user_uuid,
                                @JsonProperty("password") String password) {
        this.id = id;
        this.user_uuid = user_uuid;
        this.password = password;
    }
}
