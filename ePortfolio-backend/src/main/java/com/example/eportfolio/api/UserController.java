package com.example.eportfolio.api;

import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.User;
import com.example.eportfolio.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class UserController {

    private Gson gson = new Gson();
    private final UserService userService;
    @Autowired
    private Login login;

    @Autowired
    public UserController (UserService userService) {
        this.userService = userService;
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

    @RequestMapping (value = "/api/users/id/{uuid}", method = GET)
    @ResponseBody
    public User getUserByID (@PathVariable ("uuid") UUID id) {
        return userService.getUserByID (id)
                .orElse(null);
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
    public void updateUser (@RequestBody Map body, HttpServletResponse response, HttpServletRequest request) throws IOException{
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
                User user = login.getUser();
                Map<String, String> userMap = new HashMap<>();
                userMap.put("id", user.getId().toString());
                userMap.put("firstName", user.getFirstName());
                userMap.put("lastName", user.getLastName());
                userMap.put("email", user.getEmail());

                responseMap.put("message", "Authentication success.");
                responseMap.put("token", token);
                responseMap.put("user", userMap);
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
