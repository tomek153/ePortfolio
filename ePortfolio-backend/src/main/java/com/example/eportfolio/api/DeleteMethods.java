package com.example.eportfolio.api;

import com.example.eportfolio.model.*;
import com.example.eportfolio.service.FixedDataService;
import com.example.eportfolio.service.UserService;

import java.util.*;

public class DeleteMethods {

    public String deleteFromTable(String tableName, UUID id) {
        if (tableName == "users") {
            return "DELETE FROM " + tableName + " WHERE id = '" + id + "';";
        }
        else {
            return "DELETE FROM " + tableName + " WHERE user_uuid = '" + id + "';";
        }
    }

}
