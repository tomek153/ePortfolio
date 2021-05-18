package com.example.eportfolio.api;

import com.example.eportfolio.model.EduData;
import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.UserEdu;
import com.example.eportfolio.service.EduService;
import com.example.eportfolio.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class EduController {

    private Gson gson = new Gson();
    private final EduService eduService;
    @Autowired
    private Login login;

    @Autowired
    public EduController(EduService eduService) { this.eduService = eduService; }

    @RequestMapping (value = "/api/edu/data", method = GET)
    public void getEduData (HttpServletResponse response, HttpServletRequest request) throws IOException, SQLException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String token = request.getHeader("Authorization");
        int decStatus = Login.checkJWT(token);
        PrintWriter out = response.getWriter();

        if (decStatus == 0) {
            EduData eduData = eduService.getEduData();
            out.print(this.gson.toJson(eduData));
        } else if (decStatus == 1) {
            response.sendError(400, "token_invalid");
        } else if (decStatus == 2) {
            out.print(this.gson.toJson(new JsonParser().parse("{\"error\": \"token_expired\"}")));
        } else {
            response.sendError(405, "unknown_error");
        }

        out.flush();
    }
}
