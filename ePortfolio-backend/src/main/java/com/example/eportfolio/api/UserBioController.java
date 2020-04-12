package com.example.eportfolio.api;

import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
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

    @RequestMapping (value = "/api/users-bio/id/{user_uuid}", method = POST)
    public void addUser (@Valid @NonNull @RequestBody @PathVariable("user_uuid") UUID id, UserBio user, HttpServletResponse response) throws IOException {
        int status = userBioService.updateUserBio(id, user);
            if (status == 0) {
            System.out.println ("Błąd akualizacji użytkownika!");
            response.sendError (405, "");
        } else {
            System.out.println("Aktualizacja użytkownika pomyślna.");
        }
    }
}