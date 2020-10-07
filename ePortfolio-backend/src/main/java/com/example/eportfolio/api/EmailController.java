package com.example.eportfolio.api;

import com.example.eportfolio.smtp.EmailService;
import com.example.eportfolio.smtp.MailRequestModel;
import com.example.eportfolio.smtp.MailResponseModel;
import com.example.eportfolio.smtp.LinkMailRequestModel;
import com.example.eportfolio.model.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
public class EmailController {

    @Autowired
    private EmailService service;

    @RequestMapping(value = "/email/send", method = POST)
    public MailResponseModel sendEmail(@RequestBody MailRequestModel request) {
        Map<String, Object> model = new HashMap<>();
        model.put("Name", request.getName());
        model.put("location", "Poznań, Polska");
        model.put( "linkKey", "test");
        return service.sendRegisterEmail(request, model);
    }

    @RequestMapping(value = "/email/resend", method = POST)
    public MailResponseModel reSendEmail(@RequestBody LinkMailRequestModel request) {
        Map<String, Object> model = new HashMap<>();
        model.put("idKey", request.getIdKey());
        model.put("linkKey", request.getRegisterKey());
        return service.reSendRegisterEmail(request, model);
    }

    @RequestMapping(value = "/email/check-confirmation-link", method = POST)
    public MailResponseModel checkConfirmationLink(@RequestBody LinkMailRequestModel request) {
        return service.checkConfirmationLink(request);
    }

    @RequestMapping(value = "/email/check-reset-password-link", method = POST)
    public MailResponseModel checkResetPasswordLink(@RequestBody LinkMailRequestModel request) {
        return service.checkResetPasswordLink(request);
    }

    @RequestMapping(value = "/email/contact-message", method = POST)
    public MailResponseModel sendContactMessageEmail(@RequestBody ContactMessage request) {
        Map<String, Object> model = new HashMap<>();
        model.put("Name", request.getFirstName());
        model.put("email", request.getEmail());
        model.put("message", request.getMessage());
        return service.sendContactMessageEmail(request, model);
    }
}
