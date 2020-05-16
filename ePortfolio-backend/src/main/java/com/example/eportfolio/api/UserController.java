package com.example.eportfolio.api;

import com.auth0.jwt.interfaces.Claim;
import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
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
    private final UserBioService userBioService;
    @Autowired
    private Login login;

    @Autowired
    public UserController(UserService userService, UserBioService userBioService) {
        this.userService = userService;
        this.userBioService = userBioService;
    }

    @RequestMapping (value = "/api/users", method = POST)
    public void addUser (@Valid @NonNull @RequestBody User user, HttpServletResponse response) throws IOException {
        int status = userService.addUser(user);

        if (status == 0) {
            System.out.println ("Blad! User istnieje!");
            response.sendError (405, "User exist.");
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

    @RequestMapping (value = "/api/users/profile", method = GET)
    public void getUser (HttpServletResponse response, HttpServletRequest request) throws IOException {
        Map<String, String> profile = new HashMap<>();
        String token = request.getHeader("Authorization");
        String responseString = "";
        int decryptionStatus = Login.checkJWT(token);

        if (decryptionStatus == 0) {
            Map<String, Claim> claims = Login.getClaims();

            profile.put("id", claims.get("id").asString());
            profile.put("firstName", claims.get("first_name").asString());
            profile.put("lastName", claims.get("last_name").asString());
            profile.put("email", claims.get("email").asString());

            Optional<UserBio> userBio = userBioService.getUserBioByID(UUID.fromString(profile.get("id")));
            if (userBio.isPresent()) {
                profile.put("phone", userBio.get().getPhone());
                profile.put("address", userBio.get().getAddress_main());
                profile.put("city", userBio.get().getAddress_city());
                profile.put("zip", userBio.get().getAddress_zip());
                profile.put("country", userBio.get().getAddress_country());
                profile.put("dateBirth", userBio.get().getDate_birth());
                profile.put("gender", userBio.get().getGender());
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

    @RequestMapping (value = "/api/users/{email}", method = DELETE)
    public void deleteUser (@PathVariable ("email") String email) {
        userService.deleteUser (email);
    }

    @RequestMapping (value = "/api/users/{email}", method = PUT)
    public void updateUser (@PathVariable ("email") String email, @Valid @NonNull @RequestBody User user) {
        userService.updateUser (email, user);
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
}
