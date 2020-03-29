package com.example.eportfolio.api;

import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
import com.example.eportfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserBioController {

    private final UserBioService userBioService;

    @Autowired
    public UserBioController(UserBioService userBioService) {
        this.userBioService = userBioService;
    }

    @RequestMapping(value = "/api/users-bio/{user_uuid}", method = GET)
    @ResponseBody
    public Optional<UserBio> getUserBioByID(@PathVariable("user_uuid") UUID id) {
        return userBioService.getUserBioByID(id);
    }
}