package com.example.eportfolio.api;

import com.auth0.jwt.interfaces.Claim;
import com.example.eportfolio.model.Login;
import com.example.eportfolio.model.User;
import com.example.eportfolio.service.FixedDataService;
import com.example.eportfolio.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

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
public class FixedDataController {

    private Gson gson = new Gson();
    private final FixedDataService fixedDataService;
    @Autowired
    private Login login;

    @Autowired
    public FixedDataController(FixedDataService fixedDataService) {
        this.fixedDataService = fixedDataService;
    }


    @RequestMapping(value = "/api/fixed-data/all", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataAll(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "edu_type");
        getMethods.getFixedData(data, fixedDataService, "edu_spec");
        getMethods.getFixedData(data, fixedDataService, "work_type");
        getMethods.getFixedData(data, fixedDataService, "work_industry");
        getMethods.getFixedData(data, fixedDataService, "skill_type");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping(value = "/api/fixed-data/edu-type", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataEduType(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "edu_type");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping(value = "/api/fixed-data/edu-spec", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataEduSpec(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "edu_spec");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping(value = "/api/fixed-data/work-type", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataWorkType(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "work_type");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping(value = "/api/fixed-data/work-industry", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataWorkIndustry(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "work_industry");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

    @RequestMapping(value = "/api/fixed-data/skill-type", method = GET, produces={"application/json; charset=UTF-8"})
    public void getFixedDataSkillType(HttpServletResponse response, HttpServletRequest request) throws IOException {

        response.setContentType("application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        String responseString = "";

        GetMethods getMethods = new GetMethods();
        getMethods.getFixedData(data, fixedDataService, "skill_type");

        responseString = this.gson.toJson(data);

        PrintWriter out = response.getWriter();
        out.print(responseString);
        out.flush();
    }

}

