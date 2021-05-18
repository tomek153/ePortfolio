package com.example.eportfolio.api;

import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.WorkData;
import com.example.eportfolio.service.EduService;
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
public class WorkController {

    private Gson gson = new Gson();
    private final WorkService workService;
    @Autowired
    private Login login;

    @Autowired
    public WorkController(WorkService workService) { this.workService = workService; }

    @RequestMapping(value = "/api/work/data", method = GET)
    public void getWorkData (HttpServletResponse response, HttpServletRequest request) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String token = request.getHeader("Authorization");
        int decStatus = Login.checkJWT(token);
        PrintWriter out = response.getWriter();

        if (decStatus == 0) {
            WorkData workData = workService.getWorkData();
            out.print(this.gson.toJson(workData));
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
