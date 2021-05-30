package com.example.eportfolio.elastic.database;

import com.example.eportfolio.elastic.model.Person;
import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.TimerTask;

public class MyTask extends TimerTask {

    private List<Person> personList = new ArrayList<>();

    public MyTask() {
        //empty
    }

    @Override
    public void run() {
        long start = System.currentTimeMillis();
        String url = "jdbc:postgresql://localhost:5432/eportfolio_db";
        String user = "eportfolio_user";
        String password = "Test123!";
        Connection connection = null;

        Statement stmtUSER, stmtPUBLIC, stmtBIO, stmtWORK, stmtEDU, stmtSKILL, stmtWORK_INDUSTRY, stmtEDU_SPEC;
        stmtUSER = stmtPUBLIC = stmtBIO = stmtWORK = stmtEDU = stmtSKILL = stmtWORK_INDUSTRY = stmtEDU_SPEC = null;

        ResultSet rsUSER, rsPUBLIC, rsBIO, rsWORK, rsEDU, rsSKILL, rsWORK_INDUSTRY, rsEDU_SPEC;
        rsUSER = rsPUBLIC = rsBIO = rsWORK = rsEDU = rsSKILL = rsWORK_INDUSTRY = rsEDU_SPEC = null;

        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(url, user, password);
            connection.setAutoCommit(false);
            System.out.println("Successfully Connected.");

            stmtUSER = connection.createStatement();
            stmtPUBLIC = connection.createStatement();
            stmtBIO = connection.createStatement();
            stmtEDU = connection.createStatement();
            stmtWORK = connection.createStatement();
            stmtSKILL = connection.createStatement();
            stmtWORK_INDUSTRY = connection.createStatement();
            stmtEDU_SPEC = connection.createStatement();

            rsUSER = stmtUSER.executeQuery("select * from public.users;");

            while (rsUSER.next()) {
                String uuid = rsUSER.getString("id");
                String firstName = rsUSER.getString("first_name");
                String lastName = rsUSER.getString("last_name");
                String city = "";
                List<String> workNames = new ArrayList<>();
                List<String> workIndustries = new ArrayList<>();
                List<String> workDescriptions = new ArrayList<>();
                List<String> eduNames = new ArrayList<>();
                List<String> eduSpec = new ArrayList<>();
                List<String> eduPlace = new ArrayList<>();
                List<String> eduDescription = new ArrayList<>();
                List<String> skillNames = new ArrayList<>();
                boolean isPublic = false;

                String queryPUBLIC = "select * from public.users_setting where user_uuid='" + uuid + "';";
                rsPUBLIC = stmtPUBLIC.executeQuery(queryPUBLIC);
                while (rsPUBLIC.next()) {
                    isPublic = rsPUBLIC.getBoolean("setting_public");
                }

                String queryBIO = "select * from public.users_bio where user_uuid='" + uuid + "';";
                rsBIO = stmtBIO.executeQuery(queryBIO);
                while (rsBIO.next()) {
                    city = rsBIO.getString("address_city");
                }

                String queryWORK = "select * from public.users_work where user_uuid='" + uuid + "';";
                rsWORK = stmtWORK.executeQuery(queryWORK);
                while (rsWORK.next()) {
                    workNames.add(rsWORK.getString("work_name"));
                    String queryWORK_INDUSTRY = "select * from public.work_industry_data where id='" + rsWORK.getInt("work_industry") + "';";
                    rsWORK_INDUSTRY = stmtWORK_INDUSTRY.executeQuery(queryWORK_INDUSTRY);
                    while (rsWORK_INDUSTRY.next()) {
                        workIndustries.add(rsWORK_INDUSTRY.getString("name"));
                    }
                    workDescriptions.add(rsWORK.getString("work_desc"));
                }

                String queryEDUNAME = "select * from public.users_edu where user_uuid='" + uuid + "';";
                rsEDU = stmtEDU.executeQuery(queryEDUNAME);

                while (rsEDU.next()) {
                    eduNames.add(rsEDU.getString("edu_name"));
                    String queryEDU_SPEC = "select * from public.edu_spec_data where id='" + rsEDU.getInt("edu_spec") + "';";
                    rsEDU_SPEC = stmtEDU_SPEC.executeQuery(queryEDU_SPEC);
                    while (rsEDU_SPEC.next()) {
                        eduSpec.add(rsEDU_SPEC.getString("name"));
                    }
                    eduPlace.add(rsEDU.getString("edu_place"));
                    eduDescription.add(rsEDU.getString("edu_desc"));
                }

                String querySKILL = "select * from public.users_skill where user_uuid='" + uuid + "';";
                rsSKILL = stmtSKILL.executeQuery(querySKILL);
                while (rsSKILL.next()) {
                    skillNames.add(rsSKILL.getString("skill_name"));
                }

                Person person = new Person(uuid, firstName, lastName, city, workNames, workIndustries, workDescriptions, eduNames, eduSpec, eduPlace, eduDescription, skillNames);
                if (isPublic) {
                    personList.add(person);
                }
            }

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());

            System.exit(0);

        } finally {
            try {
                if (rsUSER != null) rsUSER.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsPUBLIC != null) rsPUBLIC.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsBIO != null) rsBIO.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsWORK != null) rsWORK.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsEDU != null) rsEDU.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsSKILL != null) rsSKILL.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsWORK_INDUSTRY != null) rsWORK_INDUSTRY.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (rsEDU_SPEC != null) rsEDU_SPEC.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtUSER != null) stmtUSER.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtPUBLIC != null) stmtPUBLIC.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtBIO != null) stmtBIO.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtWORK != null) stmtWORK.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtEDU != null) stmtEDU.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtSKILL != null) stmtSKILL.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtWORK_INDUSTRY != null) stmtWORK_INDUSTRY.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (stmtEDU_SPEC != null) stmtEDU_SPEC.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

            try {
                if (connection != null) connection.close();
            } catch (Exception e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }

        }

        System.out.println(" Data Retrieved Successfully ..");

        try {
            String commandDelete = "curl -X DELETE http://127.0.0.1:9200/_all";
            String commandCreate = "curl -X PUT http://127.0.0.1:9200/eportfolio";
            Process processDelete = Runtime.getRuntime().exec(commandDelete);
            Thread.sleep(150);
            Process processCreate = Runtime.getRuntime().exec(commandCreate);
            Thread.sleep(150);

            sendPostRequest(personList);
            System.out.println(" POST Success");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            System.out.println(" POST Error");
        }

        personList.clear();
        long finish = System.currentTimeMillis();
        System.out.println("EXECUTION TIME: " + (finish - start)/1000 + " sek.");
    }

    private void sendPostRequest(List<Person> list) throws IOException {
        URL url = new URL("http://localhost:8081/update/");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);

        Gson gson = new Gson();
        String json = gson.toJson(list);

        try (OutputStream os = con.getOutputStream()) {
            byte[] input = json.getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            System.out.println(response.toString());
        }
    }

}

