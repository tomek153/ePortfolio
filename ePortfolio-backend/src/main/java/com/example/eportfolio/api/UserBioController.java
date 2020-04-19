package com.example.eportfolio.api;

import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @RequestMapping (value = "/api/users-bio/update/{uuid}", method = PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = { MediaType.APPLICATION_JSON_VALUE})
    public void updateUserBioById (@Valid @NonNull @PathVariable("uuid") UUID id, @RequestBody UserBio userBio, HttpServletResponse response) throws IOException {
        int status = userBioService.updateUserBioById(id, userBio);
        if (status == 0) {
            System.out.println ("Błąd aktualizacji użytkownika! (BIO)");
            response.sendError (405, "Update error");
        } else {
            System.out.println("Aktualizacja użytkownika pomyślna. (BIO)");
        }
    }
}