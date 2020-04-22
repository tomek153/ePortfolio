package com.example.eportfolio.api;

import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserBioController {

    private final UserBioService userBioService;

    @Autowired
    public UserBioController(UserBioService userBioService) {
        this.userBioService = userBioService;
    }

    @RequestMapping(value = "/api/users-bio/id/{user_uuid}", method = GET)
    @ResponseBody
    public Optional<UserBio> getUserBioByID(@PathVariable("user_uuid") UUID id) {
        return userBioService.getUserBioByID(id);
    }
}