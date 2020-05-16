package com.example.eportfolio.smtp;

import com.example.eportfolio.model.ConfirmationLink;
import com.example.eportfolio.model.ResetPasswordLink;
import com.example.eportfolio.model.User;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.UUID;

@Service
public class EmailService {
    private int LINK_TIME_EXPIRED = 30;

    @Autowired
    private JavaMailSender sender;
    @Autowired
    private Configuration config;
    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public EmailService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public MailResponseModel reSendRegisterEmail(LinkMailRequestModel request, Map<String, Object> model) {
        MailResponseModel response = new MailResponseModel();
        MimeMessage message = sender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            User user = jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id IN('"+model.get("idKey")+"')",
                    new Object[]{},
                    (resultSet, i) -> {
                        return new User(
                                UUID.fromString(resultSet.getString("id")),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("email"),
                                resultSet.getString("password"),
                                resultSet.getString("role"),
                                resultSet.getBoolean("confirmed")
                        );
                    }
            );

            final String disableGeneratedLinks = "UPDATE confirmation_emails SET status = true WHERE id IN(SELECT id FROM confirmation_emails WHERE user_uuid IN('"+model.get("idKey")+"') AND status = false)";
            jdbcTemplate.execute(disableGeneratedLinks);

            final String addConfirmationEmailSQL = "INSERT INTO confirmation_emails (id, user_uuid, status) VALUES (" +
                    "uuid_generate_v4(), " +
                    "(SELECT id FROM users WHERE email IN('"+user.getEmail()+"')), "+
                    "false )";
            jdbcTemplate.execute(addConfirmationEmailSQL);

            String getNewEmailKey = "SELECT id FROM confirmation_emails WHERE user_uuid IN (SELECT id FROM users WHERE email = '"+user.getEmail()+"') AND status = false";
            String newEmailKey = jdbcTemplate.queryForObject(getNewEmailKey, new Object[]{}, (resultSet, i) -> {
                return new String (resultSet.getString("id"));
            });

            model.replace("linkKey", newEmailKey);
            model.put("location", "Poznań, Polska");
            model.put("Name", user.getFirstName());

            Template t = config.getTemplate("resend-registration-link.html");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

            helper.setTo(user.getEmail());
            helper.setText(html, true);
            helper.addInline("imageLogo", new ClassPathResource("images/logo.png"));
            helper.setSubject("ePortfolio | Link aktywacyjny.");
            helper.setFrom("ePortfolio");
            sender.send(message);

            response.setMessage("Mail send to : " + user.getEmail());
            response.setStatus(Boolean.TRUE);
        } catch (MessagingException | IOException | TemplateException e) {
            response.setMessage("Mail Sending failure : "+e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;

    }

    public MailResponseModel sendRegisterEmail(MailRequestModel request, Map<String, Object> model) {
        MailResponseModel response = new MailResponseModel();
        MimeMessage message = sender.createMimeMessage();

        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            // add attachment

            Template t = config.getTemplate("registration-link.html");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

            helper.setTo(request.getTo());
            helper.setText(html, true);
            helper.addInline("imageLogo", new ClassPathResource("images/logo.png"));
            helper.setSubject(request.getSubject());
            helper.setFrom(request.getFrom());
            sender.send(message);

            response.setMessage("Mail send to : " + request.getTo());
            response.setStatus(Boolean.TRUE);

        } catch (MessagingException | IOException | TemplateException e) {
            response.setMessage("Mail Sending failure : "+e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }

    public MailResponseModel sendResetPasswordEmail(MailRequestModel request, Map<String, Object> model) {
        MailResponseModel response = new MailResponseModel();
        MimeMessage message = sender.createMimeMessage();

        try {
            // set mediaType
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            // add attachment

            Template t = config.getTemplate("reset-password-link.html");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

            helper.setTo(request.getTo());
            helper.setText(html, true);
            helper.addInline("imageLogo", new ClassPathResource("images/logo.png"));
            helper.setSubject(request.getSubject());
            helper.setFrom(request.getFrom());
            sender.send(message);

            response.setMessage("Mail send to : " + request.getTo());
            response.setStatus(Boolean.TRUE);

        } catch (MessagingException | IOException | TemplateException e) {
            response.setMessage("Mail Sending failure : "+e.getMessage());
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }

    public MailResponseModel checkConfirmationLink(LinkMailRequestModel request) {
        MailResponseModel response = new MailResponseModel();

        try {
            User user = jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id IN('"+request.getIdKey()+"')",
                    new Object[]{},
                    (resultSet, i) -> {
                        return new User(
                                UUID.fromString(resultSet.getString("id")),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("email"),
                                resultSet.getString("password"),
                                resultSet.getString("role"),
                                resultSet.getBoolean("confirmed")
                        );
                    }
            );

            ConfirmationLink confirmationLink = jdbcTemplate.queryForObject(
                    "SELECT * FROM confirmation_emails WHERE id IN('"+request.getRegisterKey()+"') AND user_uuid IN('"+request.getIdKey()+"')",
                    new Object[]{},
                    (resultSet, i) -> {
                        return new ConfirmationLink(
                                UUID.fromString(resultSet.getString("id")),
                                UUID.fromString(resultSet.getString("user_uuid")),
                                resultSet.getBoolean("status"),
                                LocalDateTime.parse(resultSet.getString("time_stamp"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS"))
                        );
                    }
            );

            if (user.isConfirmed()) {
                response.setMessage("user_confirmed");
                response.setStatus(Boolean.TRUE);
            } else {
                if (confirmationLink.isStatus()) {
                    response.setMessage("deactivated");
                    response.setStatus(Boolean.TRUE);
                } else {
                    LocalDateTime now = LocalDateTime.now();

                    if (now.compareTo(confirmationLink.getTime_stamp().plusMinutes(LINK_TIME_EXPIRED)) > 0) {
                        response.setMessage("expired");
                        response.setStatus(Boolean.TRUE);
                    } else {
                        jdbcTemplate.execute("UPDATE users set confirmed = true WHERE id IN('"+user.getId()+"')");
                        jdbcTemplate.execute("UPDATE confirmation_emails SET status = true WHERE id IN('"+confirmationLink.getId()+"');");

                        response.setMessage("success");
                        response.setStatus(Boolean.TRUE);
                    }
                }
            }
        } catch (EmptyResultDataAccessException | DateTimeParseException e) {
            response.setMessage("Error 404");
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }

    public MailResponseModel checkResetPasswordLink(LinkMailRequestModel request) {
        MailResponseModel response = new MailResponseModel();

        try {
            ResetPasswordLink resetPasswordLink = jdbcTemplate.queryForObject(
                    "SELECT * FROM reset_password_emails WHERE id IN('"+request.getRegisterKey()+"') AND user_uuid IN('"+request.getIdKey()+"')",
                    new Object[]{},
                    (resultSet, i) -> {
                        return new ResetPasswordLink(
                                UUID.fromString(resultSet.getString("id")),
                                UUID.fromString(resultSet.getString("user_uuid")),
                                resultSet.getBoolean("status"),
                                LocalDateTime.parse(resultSet.getString("time_stamp"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS"))
                        );
                    }
            );


                if (resetPasswordLink.isStatus()) {
                    response.setMessage("deactivated");
                    response.setStatus(Boolean.TRUE);
                } else {
                    LocalDateTime now = LocalDateTime.now();

                    if (now.compareTo(resetPasswordLink.getTime_stamp().plusMinutes(LINK_TIME_EXPIRED)) > 0) {
                        response.setMessage("expired");
                        response.setStatus(Boolean.TRUE);
                    } else {


                        response.setMessage("success");
                        response.setStatus(Boolean.TRUE);
                    }
                }

        } catch (EmptyResultDataAccessException | DateTimeParseException e) {
            response.setMessage("Error 404");
            response.setStatus(Boolean.FALSE);
        }

        return response;
    }
}
