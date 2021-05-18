package com.example.eportfolio.service;

import com.example.eportfolio.dao.WorkDao;
import com.example.eportfolio.model.WorkData;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class WorkService {

    private final WorkDao workDao;

    public WorkService(@Qualifier("postgres") WorkDao workDao) { this.workDao = workDao; }

    public WorkData getWorkData() { return workDao.getWorkData(); }
}
