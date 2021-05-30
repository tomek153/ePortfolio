package com.example.eportfolio.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class EduData {
    private List<Map<String, Object>> eduType;
    private List<Map<String, Object>> eduSpec;

    public EduData(List<Map<String, Object>> eduType, List<Map<String, Object>> eduSpec) {
        this.eduType = eduType;
        this.eduSpec = eduSpec;
    }

    public EduData() {}
}
