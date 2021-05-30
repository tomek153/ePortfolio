package com.example.eportfolio.service;

import com.example.eportfolio.dao.SkillDao;
import com.example.eportfolio.model.SkillData;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SkillService {

    private final SkillDao skillDao;

    public SkillService(@Qualifier("postgres") SkillDao skillDao) { this.skillDao = skillDao; }

    public SkillData getSkillData() { return skillDao.getSkillData(); }
}
