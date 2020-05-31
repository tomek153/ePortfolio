package com.example.eportfolio.api;

import com.example.eportfolio.model.User;
import com.example.eportfolio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
public class UserController {

    private final UserService userService;

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

    @RequestMapping (value = "/api/users/update/{uuid}", method = PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = { MediaType.APPLICATION_JSON_VALUE})
    public void updateUser (@Valid @NonNull @PathVariable("uuid") UUID id, @RequestBody User user, HttpServletResponse response) throws IOException {
        int status = userService.updateUser(id, user);
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
