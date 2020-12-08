package com.example.eportfolio.api;

import com.example.eportfolio.model.*;
import com.example.eportfolio.service.UserService;

import java.util.*;

public class GetMethods {

    public Map getUserBioData(Map<String, Object> map, UserService userService, UUID id) {

        Optional<UserBio> userBio = userService.getUserBioByID(id);
        if (userBio.isPresent()) {
            Map<String, Object> userBioData = new HashMap<>();

            userBioData.put("phone", userBio.get().getPhone());
            userBioData.put("address", userBio.get().getAddress_main());
            userBioData.put("city", userBio.get().getAddress_city());
            userBioData.put("zip", userBio.get().getAddress_zip());
            userBioData.put("country", userBio.get().getAddress_country());
            userBioData.put("dateBirth", userBio.get().getDate_birth());
            userBioData.put("gender", userBio.get().getGender());

            map.put("userBio", userBioData);
        }
        return map;

    }

    public Map getUserWorkData(Map<String, Object> map, UserService userService, UUID id) {

        List<UserWork> userWork = userService.getUserWorkByID(id);
        if (!userWork.isEmpty()) {
            Map<String, Object>[] userWorkArray = new HashMap[userWork.size()];
            for (int i = 0; i < userWork.size(); i++) {
                Map<String, Object> userWorkData = new HashMap<>();

                userWorkData.put("work_industry", userWork.get(i).getWork_industry());
                userWorkData.put("work_type", userWork.get(i).getWork_type());
                userWorkData.put("work_name", userWork.get(i).getWork_name());
                userWorkData.put("work_time_start", userWork.get(i).getWork_time_start());
                userWorkData.put("work_time_end", userWork.get(i).getWork_time_end());
                userWorkData.put("work_place", userWork.get(i).getWork_place());
                userWorkData.put("work_desc", userWork.get(i).getWork_desc());
                userWorkData.put("work_location", userWork.get(i).getWork_location());

                userWorkArray[i] = userWorkData;
            }
            map.put("userWork", userWorkArray);
        }

        return map;
    }

    public Map getUserEduData(Map<String, Object> map, UserService userService, UUID id) {

        List<UserEdu> userEdu = userService.getUserEduByID(id);
        if (!userEdu.isEmpty()) {
            Map<String, Object>[] userEduArray = new HashMap[userEdu.size()];
            for (int i = 0; i < userEdu.size(); i++) {
                Map<String, Object> userEduData = new HashMap<>();

                userEduData.put("edu_spec", userEdu.get(i).getEdu_spec());
                userEduData.put("edu_type", userEdu.get(i).getEdu_type());
                userEduData.put("edu_name", userEdu.get(i).getEdu_name());
                userEduData.put("edu_time_start", userEdu.get(i).getEdu_time_start());
                userEduData.put("edu_time_end", userEdu.get(i).getEdu_time_end());
                userEduData.put("edu_place", userEdu.get(i).getEdu_place());
                userEduData.put("edu_desc", userEdu.get(i).getEdu_desc());

                userEduArray[i] = userEduData;
            }
            map.put("userEdu", userEduArray);
        }
        return map;
    }

    public Map getUserSkillData(Map<String, Object> map, UserService userService, UUID id) {

        List<UserSkill> userSkill = userService.getUserSkillByID(id);
        if (!userSkill.isEmpty()) {
            Map<String, Object>[] userSkillArray = new HashMap[userSkill.size()];
            for (int i = 0; i < userSkill.size(); i++) {
                Map<String, Object> userSkillData = new HashMap<>();

                userSkillData.put("skill_type", userSkill.get(i).getSkill_type());
                userSkillData.put("skill_name", userSkill.get(i).getSkill_name());
                userSkillData.put("skill_time_months", userSkill.get(i).getSkill_time_months());
                userSkillData.put("skill_level", userSkill.get(i).getSkill_level());

                userSkillArray[i] = userSkillData;
            }
            map.put("userSkill", userSkillArray);
        }

        return map;
    }

    public Map getUserSettingData(Map<String, Object> map, UserService userService, UUID id) {

        Optional<UserSetting> userSetting = userService.getUserSettingByID(id);
        if (userSetting.isPresent()) {
            Map<String, Object> userSettingData = new HashMap<>();

            userSettingData.put("public", userSetting.get().isSetting_public());
            userSettingData.put("header1", userSetting.get().getSetting_header1());
            userSettingData.put("header2", userSetting.get().getSetting_header2());
            userSettingData.put("img", userSetting.get().getSetting_img());
            userSettingData.put("consent", userSetting.get().isSetting_consent());
            userSettingData.put("allow_contact", userSetting.get().isSetting_allow_contact());

            map.put("userSetting", userSettingData);
        }

        return map;
    }

}
