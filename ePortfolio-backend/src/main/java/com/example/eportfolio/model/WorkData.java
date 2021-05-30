package com.example.eportfolio.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkData {
    private List<Map<String, Object>> workIndustry;
    private List<Map<String, Object>> workType;
    private List<Map<String, Object>> workProfessions;
    private List<Map<String, Object>> locations;
}
