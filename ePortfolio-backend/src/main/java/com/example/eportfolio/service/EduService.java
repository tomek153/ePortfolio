package com.example.eportfolio.service;

import com.example.eportfolio.dao.EduDao;
import com.example.eportfolio.model.EduData;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class EduService {

    private final EduDao eduDao;

    public EduService(@Qualifier("postgres") EduDao eduDao) { this.eduDao = eduDao; }

    public EduData getEduData() { return eduDao.getEduData(); }
}
