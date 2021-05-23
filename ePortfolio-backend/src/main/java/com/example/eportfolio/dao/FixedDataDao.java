package com.example.eportfolio.dao;

import com.example.eportfolio.model.*;

import java.util.List;

public interface FixedDataDao {

    // GET DATA METHODS -START-
    List<FixedData> getFixedData(String dataType);
    // GET DATA METHODS -END-

    SearchingFilters getSearchingFilters();

}
