package com.example.eportfolio.api;

import com.auth0.jwt.interfaces.Claim;
import com.example.eportfolio.model.*;
import com.example.eportfolio.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class UserController {

    private Gson gson = new Gson();
    private final UserService userService;
    @Autowired
    private Login login;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping (value = "/api/users", method = POST)
    public void addUser (@Valid @NonNull @RequestBody User user, HttpServletResponse response) throws IOException {
        int status = userService.addUser(user);

        if (status == 0) {
            System.out.println ("User istnieje!");
            response.sendError (405, "User exist.");
        } else if (status == 2) {
            System.out.println ("Niepoprawne dzialanie servisu smtp!");
            response.sendError (405, "SMTP error.");
        } else if (status == 3) {
            System.out.println ("Blad autoryzacji google smtp!");
            response.sendError (405, "SMTP error.");
        } else {
            System.out.println("User dodany.");
        }
    }

    @RequestMapping (value = "/api/reset-password", method = POST)
    public void resetPasswordRequest (@Valid @NonNull @RequestBody User user, HttpServletResponse response) throws IOException {
        int status = userService.resetPasswordRequest(user);

        if (status == 0) {
            System.out.println ("Blad! User nie istnieje!");
            response.sendError (405, "User_does_not_exist");
        } else {
            System.out.println("Mail wysłany.");
        }
    }

    @RequestMapping (value = "/api/change-password", method = POST)
    public void changePasswordForUser(@Valid @NonNull @RequestBody User user, HttpServletResponse response) throws IOException {
        System.out.println ("Zmiana hasła");
        int status = userService.changePassword(user);

        if (status == 0) {
            System.out.println ("Hasło nie zostało zmienione!");
            response.sendError (405, "User_does_not_exist");
        } else {
            System.out.println("Password_changed");
        }
    }

    @RequestMapping (value = "/api/users", method = GET)
    @ResponseBody
    public List<User> getUsers () {
        return userService.getUsers();
    }

    @RequestMapping (value = "/api/users/{email}", method = GET)
    @ResponseBody
    public User getUserByEmail (@PathVariable ("email") String email) {
        return userService.getUserByEmail (email)
                .orElse(null);
    }

    @RequestMapping (value = "/api/users/profile/all", method = GET)
    public void getUser (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            Optional<UserBio> userBio = userService.getUserBioByID(UUID.fromString(claims.get("id").asString()));
            if (userBio.isPresent()) {
                Map<String, Object> userBioData = new HashMap<>();

                userBioData.put("phone", userBio.get().getPhone());
                userBioData.put("address", userBio.get().getAddress_main());
                userBioData.put("city", userBio.get().getAddress_city());
                userBioData.put("zip", userBio.get().getAddress_zip());
                userBioData.put("country", userBio.get().getAddress_country());
                userBioData.put("dateBirth", userBio.get().getDate_birth());
                userBioData.put("gender", userBio.get().getGender());

                profile.put("userBio", userBioData);
            }

            List<UserWork> userWork = userService.getUserWorkByID(UUID.fromString(claims.get("id").asString()));
            if (!userWork.isEmpty()) {
                Map<String, Object>[] userWorkArray = new HashMap[userWork.size()];
                for(int i=0; i < userWork.size(); i++){
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
                profile.put("userWork", userWorkArray);
            }

            List<UserEdu> userEdu = userService.getUserEduByID(UUID.fromString(claims.get("id").asString()));
            if (!userEdu.isEmpty()) {
                Map<String, Object>[] userEduArray = new HashMap[userEdu.size()];
                for(int i=0; i < userEdu.size(); i++){
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
                profile.put("userEdu", userEduArray);
            }

            List<UserSkill> userSkill = userService.getUserSkillByID(UUID.fromString(claims.get("id").asString()));
            if (!userSkill.isEmpty()) {
                Map<String, Object>[] userSkillArray = new HashMap[userSkill.size()];
                for(int i=0; i < userSkill.size(); i++){
                    Map<String, Object> userSkillData = new HashMap<>();

                    userSkillData.put("skill_type", userSkill.get(i).getSkill_type());
                    userSkillData.put("skill_name", userSkill.get(i).getSkill_name());
                    userSkillData.put("skill_time_months", userSkill.get(i).getSkill_time_months());
                    userSkillData.put("skill_level", userSkill.get(i).getSkill_level());

                    userSkillArray[i] = userSkillData;
                }
                profile.put("userSkill", userSkillArray);
            }

            Optional<UserSetting> userSetting = userService.getUserSettingByID(UUID.fromString(claims.get("id").asString()));
            if (userSetting.isPresent()) {
                Map<String, Object> userSettingData = new HashMap<>();

                userSettingData.put("public", userSetting.get().isSetting_public());
                userSettingData.put("header1", userSetting.get().getSetting_header1());
                userSettingData.put("header2", userSetting.get().getSetting_header2());
                userSettingData.put("img", userSetting.get().getSetting_img());
                userSettingData.put("consent", userSetting.get().isSetting_consent());
                userSettingData.put("allow_contact", userSetting.get().isSetting_allow_contact());

                profile.put("userSetting", userSettingData);
            }


            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/login", method = POST)
    public void userLogin (@RequestBody Map body, HttpServletResponse response, HttpServletRequest request) throws IOException{
        int status = login.authenticate(body.get("email").toString(), body.get("password").toString());
        Map<String, Object> responseMap = new HashMap<>();

        if (status == 1)
            responseMap.put("message", "Authentication failed.");
        else if (status == 2) {
            responseMap.put("message", "User unconfirmed.");
            responseMap.put("userId", login.getUser().getId());
        } else if (status == 0) {
            String token = login.createToken();
            if (!token.equals("Create token error.")) {

                responseMap.put("message", "Authentication success.");
                responseMap.put("token", token);
            } else
                responseMap.put("message", "Token error.");
        }

        String responseString = this.gson.toJson(responseMap);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/{email}", method = PUT)
    public void updateUser (@PathVariable ("email") String email, @Valid @RequestBody User user, HttpServletResponse response) throws IOException {
        int status = userService.updateUser (email, user);
        if (status == 0) {
            System.out.println ("Błąd aktualizacji użytkownika!");
            response.sendError (405, "Update error");
        } else if(status == -1) {
            System.out.println ("Błąd aktualizacji użytkownika! - Email");
            response.sendError (405, "Update error - email");
        } else {
            System.out.println("Aktualizacja użytkownika pomyślna.");
        }
    }

    @RequestMapping (value = "/api/users/delete/{uuid}", method = GET)
    public void deleteUser (@Valid @NonNull @PathVariable("uuid") UUID id, HttpServletResponse response) throws IOException {
        int status = userService.deleteUser(id);
        if (status == 0) {
            System.out.println ("Błąd aktualizacji użytkownika!");
            response.sendError (405, "Delete error");
        } else if(status == -1) {
            System.out.println ("Błąd aktualizacji użytkownika! - Password");
            response.sendError (405, "Delete error - password");
        } else {
            System.out.println("Usunięcie użytkownika pomyślne.");
        }
    }


}

