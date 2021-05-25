package com.example.eportfolio.elastic.model;

import java.util.List;

public class Person {

    private final String uuid;
    private final String firstName;
    private final String lastName;
    private final String city;
    private final List<String> workNames;
    private final List<String> workIndustries;
    private final List<String> workDescriptions;
    private final List<String> eduNames;
    private final List<String> eduSpec;
    private final List<String> eduPlace;
    private final List<String> eduDescription;
    private final List<String> skillName;

    public Person(String uuid,
                  String firstName,
                  String lastName,
                  String city,
                  List<String> workNames,
                  List<String> workIndustries,
                  List<String> workDescriptions,
                  List<String> eduNames,
                  List<String> eduSpec,
                  List<String> eduPlace,
                  List<String> eduDescription,
                  List<String> skillName) {
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.workNames = workNames;
        this.workIndustries = workIndustries;
        this.workDescriptions = workDescriptions;
        this.eduNames = eduNames;
        this.eduSpec = eduSpec;
        this.eduPlace = eduPlace;
        this.eduDescription = eduDescription;
        this.skillName = skillName;
    }

    public String getUuid() {
        return uuid;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCity() {
        return city;
    }

    public List<String> getWorkNames() {
        return workNames;
    }

    public List<String> getWorkIndustries() {
        return workIndustries;
    }

    public List<String> getWorkDescriptions() {
        return workDescriptions;
    }

    public List<String> getEduNames() {
        return eduNames;
    }

    public List<String> getEduSpec() {
        return eduSpec;
    }

    public List<String> getEduPlace() {
        return eduPlace;
    }

    public List<String> getEduDescription() {
        return eduDescription;
    }

    public List<String> getSkillName() {
        return skillName;
    }
}
