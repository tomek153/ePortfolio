package com.example.eportfolio.api;

import com.auth0.jwt.interfaces.Claim;
import com.example.eportfolio.model.*;
import com.example.eportfolio.service.UserService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
    public void addUser (@Valid @NonNull @RequestBody User user, HttpServletResponse response) throws IOException, SQLException {
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
    public void resetPasswordRequest (@Valid @NonNull @RequestBody String email, HttpServletResponse response) throws IOException {
        int status = userService.resetPasswordRequest(email);

        if (status == 0) {
            System.out.println("\"/api/reset-password\": User does not exists.");
            response.sendError (405, "user_does_not_exist");
        }
    }

    @RequestMapping (value = "/api/change-password", method = POST)
    public void changePasswordForUser(@Valid @NonNull @RequestBody ResetPasswordRequest resetPasswordRequest, HttpServletResponse response) throws IOException {
        int status = userService.changePassword(resetPasswordRequest);
//
        if (status == 0) {
            System.out.println("\"/api/change-password\": User does not exists.");
            response.sendError (405, "user_does_not_exist");
        }
    }

    @RequestMapping (value = "/api/users", method = GET)
    @ResponseBody
    public List<User> getUsers () {
        return userService.getUsers();
    }

    @RequestMapping (value = "/api/users/{email}", method = GET)
    @ResponseBody
    public void checkUserExistByEmail (@PathVariable ("email") String email, HttpServletResponse response) throws IOException {
        boolean userExist = userService.checkUserExistByEmail (email);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (userExist) {
            out.print("user_exist");
        } else {
            out.print("user_not_exist");
        }
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/all", method = GET)
    public void getUserAll (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            UUID userUUID = UUID.fromString(claims.get("id").asString());
            GetMethods getMethods = new GetMethods();
            getMethods.getUserBioData(profile, userService , userUUID);
            getMethods.getUserWorkData(profile, userService , userUUID);
            getMethods.getUserEduData(profile, userService , userUUID);
            getMethods.getUserSkillData(profile, userService , userUUID);
            getMethods.getUserSettingData(profile, userService , userUUID);

            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/public/{uuid}", method = GET)
    public void getUserPublic (@PathVariable ("uuid") UUID uuid, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String responseString = "";
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (uuid.toString() != "") {

            profile.put("id", uuid.toString());

            GetMethods getMethods = new GetMethods();
            getMethods.getUserMainData(profile, userService , uuid);
            getMethods.getUserWorkData(profile, userService , uuid);
            getMethods.getUserEduData(profile, userService , uuid);
            getMethods.getUserSkillData(profile, userService , uuid);
            getMethods.getUserSettingData(profile, userService , uuid);

            responseString = this.gson.toJson(profile);
        }
        else{
            response.sendError(400, "User Data Unavailable");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/contact", method = GET)
    public void getUserContact (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            UUID userUUID = UUID.fromString(claims.get("id").asString());
            GetMethods getMethods = new GetMethods();
            getMethods.getUserBioData(profile, userService , userUUID);
            getMethods.getUserSettingData(profile, userService , userUUID);

            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/work", method = GET)
    public void getUserWork (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            UUID userUUID = UUID.fromString(claims.get("id").asString());
            GetMethods getMethods = new GetMethods();
            getMethods.getUserWorkData(profile, userService , userUUID);
            getMethods.getUserSettingData(profile, userService , userUUID);

            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/edu", method = GET)
    public void getUserEdu (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            UUID userUUID = UUID.fromString(claims.get("id").asString());
            GetMethods getMethods = new GetMethods();
            getMethods.getUserEduData(profile, userService , userUUID);
            getMethods.getUserSettingData(profile, userService , userUUID);

            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/profile/skill", method = GET)
    public void getUserSkill (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            UUID userUUID = UUID.fromString(claims.get("id").asString());
            GetMethods getMethods = new GetMethods();
            getMethods.getUserSkillData(profile, userService , userUUID);
            getMethods.getUserSettingData(profile, userService , userUUID);

            responseString = this.gson.toJson(profile);
        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/login", method = POST)
    public void userLogin (@RequestBody Map body, HttpServletResponse response, HttpServletRequest request) throws IOException{
        int status = login.authenticate(body.get("email").toString(), body.get("password").toString());
        Map<String, Object> responseMap = new HashMap<>();

        if (status == 1)
            responseMap.put("message", "authentication_failed.");
        else if (status == 2) {
            responseMap.put("message", "user_unconfirmed.");
            responseMap.put("userId", login.getUser().getId());
        } else if (status == 0) {
            String token = login.createToken();
            if (!token.equals("create_token_error.")) {

                responseMap.put("message", "authentication_success.");
                responseMap.put("token", token);
            } else
                responseMap.put("message", "token_error.");
        }

        String responseString = this.gson.toJson(responseMap);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/delete", method = DELETE)
    public void deleteUser (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.deleteUser(userUUID);
                if( result == 0 ) { System.out.println("DELETE OK"); }
                else { response.sendError(400, "Bad request. Delete not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Delete not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/add/work", method = POST)
    public void addUserWork (@Valid @NonNull @RequestBody UserWork userWork, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.addUserWork(userUUID, userWork);
                if( result == 1 ) { System.out.println("USERWORK ADDED"); }
                else { response.sendError(400, "Bad request. Method not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Method not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/add/edu", method = POST)
    public void addUserEdu (@Valid @NonNull @RequestBody UserEdu userEdu, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.addUserEdu(userUUID, userEdu);
                if( result == 1 ) { System.out.println("USEREDU ADDED"); }
                else { response.sendError(400, "Bad request. Method not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Method not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/add/skill", method = POST)
    public void addUserSkill (@Valid @NonNull @RequestBody UserSkill userSkill, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.addUserSkill(userUUID, userSkill);
                if( result == 1 ) { System.out.println("USERSKILL ADDED"); }
                else { response.sendError(400, "Bad request. Method not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Method not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/delete/work/{uuid}", method = DELETE)
    public void deleteUserWork (@PathVariable ("uuid") UUID userWorkUUID, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.deleteUserWork(userUUID, userWorkUUID);
                if( result == 0 ) { System.out.println("DELETE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Delete not allowed. This UserWork does not exist");}
                else { response.sendError(400, "Bad request. Delete not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Delete not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/delete/edu/{uuid}", method = DELETE)
    public void deleteUserEdu (@PathVariable ("uuid") UUID userEduUUID, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.deleteUserEdu(userUUID, userEduUUID);
                if( result == 0 ) { System.out.println("DELETE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Delete not allowed. This UserEdu does not exist");}
                else { response.sendError(400, "Bad request. Delete not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Delete not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/delete/skill/{uuid}", method = DELETE)
    public void deleteUserSkill (@PathVariable ("uuid") UUID userSkillUUID, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.deleteUserSkill(userUUID, userSkillUUID);
                if( result == 0 ) { System.out.println("DELETE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Delete not allowed. This UserSkill does not exist");}
                else { response.sendError(400, "Bad request. Delete not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Delete not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/work", method = PUT)
    public void updateUserWork (@Valid @RequestBody UserWork userWork, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.updateUserWork(userUUID, userWork);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This UserWork does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/edu", method = PUT)
    public void updateUserEdu (@Valid @RequestBody UserEdu userEdu, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.updateUserEdu(userUUID, userEdu);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This UserEdu does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/skill", method = PUT)
    public void updateUserSkill (@Valid @RequestBody UserSkill userSkill, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.updateUserSkill(userUUID, userSkill);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This UserSkill does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/user", method = PUT)
    public void updateUser (@Valid @RequestBody User user, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.editUser(userUUID, user);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This User does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/user-bio", method = PUT)
    public void updateUserBio (@Valid @RequestBody UserBio userBio, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.editUserBio(userUUID, userBio);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This userBio does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping (value = "/api/users/edit/user-setting", method = PUT)
    public void updateUserSetting (@Valid @RequestBody UserSetting userSetting, HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, Object> profileMap = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profileMap.put("id", claims.get("id").asString());
            UUID userUUID = UUID.fromString(claims.get("id").asString());

            try {
                int result = userService.editUserSetting(userUUID, userSetting);
                if( result == 0 ) { System.out.println("UPDATE OK"); }
                else if( result == 2 ) { response.sendError(400, "Bad request. Update not allowed. This userSetting does not exist");}
                else { response.sendError(400, "Bad request. Update not allowed."); }
            } catch (SQLException e) {
                e.printStackTrace();
                response.sendError(400, "Bad request. Update not allowed.");
            }


        } else if (decryptionStatus == 2) {
            response.sendError(400, "Token expired");
        } else if (decryptionStatus == 1) {
            response.sendError(400, "Token decryption error");
        } else {
            response.sendError(400, "Unknown error");
        }

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

}