package com.example.eportfolio.elastic.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;
import java.util.UUID;

@Document(indexName = "eportfolio", shards = 2)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Id
    private String id;
    private String uuid;
    private String firstName;
    private String lastName;
    private String city;
    private List<String> workNames;
    private List<String> workIndustries;
    private List<String> workDescriptions;
    private List<String> eduNames;
    private List<String> eduSpec;
    private List<String> eduPlace;
    private List<String> eduDescription;
    private List<String> skillName;

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

    public String getId() {
        return id;
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
