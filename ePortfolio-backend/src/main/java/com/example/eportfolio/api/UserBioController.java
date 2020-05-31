package com.example.eportfolio.api;

import com.example.eportfolio.model.User;
import com.example.eportfolio.model.UserBio;
import com.example.eportfolio.service.UserBioService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping (value = "/api/users-bio/{id}", method = PUT)
    public void updateUser (@PathVariable ("id") UUID id, @Valid @RequestBody UserBio userBio, HttpServletResponse response) throws IOException {
        int status = userBioService.updateUserBio (id, userBio);
        if (status == 0) {
            System.out.println ("Błąd aktualizacji użytkownika! [BIO]");
            response.sendError (405, "Update error");
        } else {
            System.out.println("Aktualizacja użytkownika pomyślna. [BIO]");
        }
    }
}