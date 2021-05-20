package com.example.eportfolio.api;

import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.SkillData;
import com.example.eportfolio.model.WorkData;
import com.example.eportfolio.service.SkillService;
import com.example.eportfolio.service.WorkService;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class SkillController {

    private Gson gson = new Gson();
    private final SkillService skillService;
    @Autowired
    private Login login;

    @Autowired
    public SkillController(SkillService skillService) { this.skillService = skillService; }

    @RequestMapping(value = "/api/skill/data", method = GET)
    public void getSkillData (HttpServletResponse response, HttpServletRequest request) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String token = request.getHeader("Authorization");
        int decStatus = Login.checkJWT(token);
        PrintWriter out = response.getWriter();

        if (decStatus == 0) {
            SkillData skillData = skillService.getSkillData();
            out.print(this.gson.toJson(skillData));
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
