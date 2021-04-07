package com.example.eportfolio.elastic.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import java.util.List;

@Document(indexName="eportfolio",shards=2)
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

}
