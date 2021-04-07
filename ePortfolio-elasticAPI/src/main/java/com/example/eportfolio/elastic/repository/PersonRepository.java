package com.example.eportfolio.elastic.repository;

import com.example.eportfolio.elastic.model.Person;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface PersonRepository extends ElasticsearchRepository<Person, String> {

    List<Person> findByCity(String city);

    List<Person> findByWorkNames(String workNames);

    List<Person> findByWorkIndustries(String workIndustries);

    List<Person> findByWorkDescriptions(String workDescriptions);

    List<Person> findByEduNames(String eduNames);

    List<Person> findByEduSpec(String eduSpec);

    List<Person> findByEduPlace(String eduPlace);

    List<Person> findByEduDescription(String eduDescription);

    List<Person> findBySkillName(String skillName);

}

