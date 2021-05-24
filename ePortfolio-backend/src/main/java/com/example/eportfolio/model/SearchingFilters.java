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
    List<SelectRow> addressCityList;
    List<SelectRow> workNameList;
    List<SelectRow> workIndustryList;
    List<SelectRow> eduNameList;
    List<SelectRow> eduSpecList;
    List<SelectRow> skillNameList;
}
