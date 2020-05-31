package com.example.eportfolio.smtp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class LinkMailRequestModel {
    @NotNull
    private UUID idKey;
    @NotNull
    private UUID registerKey;

    public LinkMailRequestModel(@JsonProperty("idKey") UUID idKey,
                                @JsonProperty("registerKey") UUID registerKey) {
        this.idKey = idKey;
        this.registerKey = registerKey;
    }

    public UUID getIdKey() {
        return idKey;
    }

    public void setIdKey(UUID idKey) {
        this.idKey = idKey;
    }

    public UUID getRegisterKey() {
        return registerKey;
    }

    public void setRegisterKey(UUID registerKey) {
        this.registerKey = registerKey;
    }
}
