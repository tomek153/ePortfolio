package com.example.eportfolio.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchingFilters {
    List<String> addressCityList;
    List<String> workNameList;
    List<String> workIndustryList;
    List<String> eduNameList;
    List<String> eduSpecList;
    List<String> skillNameList;
}
