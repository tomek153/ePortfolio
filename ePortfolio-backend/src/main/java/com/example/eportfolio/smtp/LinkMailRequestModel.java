package com.example.eportfolio.smtp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class LinkMailRequestModel {
    @NotNull @Getter @Setter private UUID id;
    @NotNull @Getter @Setter private UUID userId;

    public LinkMailRequestModel(@JsonProperty("linkId") UUID id,
                                @JsonProperty("userId") UUID userId) {
        this.id = id;
        this.userId = userId;
    }
}
