package com.example.eportfolio.service;

import com.example.eportfolio.dao.FixedDataDao;
import com.example.eportfolio.dao.UserDao;
import com.example.eportfolio.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FixedDataService {

    private final FixedDataDao fixedDataDao;

    public FixedDataService(@Qualifier("postgres") FixedDataDao fixedDataDao) {
        this.fixedDataDao = fixedDataDao;
    }

    // GET DATA METHODS -START-
    public List<FixedData> getFixedData(String dataType) {
        return fixedDataDao.getFixedData(dataType);
    }
    // GET DATA METHODS -END-

    public SearchingFilters getSearchingFilters() { return fixedDataDao.getSearchingFilters(); }
}
