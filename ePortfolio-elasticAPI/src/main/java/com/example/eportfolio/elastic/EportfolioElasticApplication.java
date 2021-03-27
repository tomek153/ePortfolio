package com.example.eportfolio.elastic;

import com.example.eportfolio.elastic.model.Person;

import com.example.eportfolio.elastic.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
public class EportfolioElasticApplication {

    @Autowired
    private PersonRepository personRepository;


    @GetMapping("/find/all")
    public Iterable<Person> findAllPersons() {
        return personRepository.findAll();
    }

    @GetMapping("/find/city/{city}")
    public List<Person> findByCity(@PathVariable String city) {
        return personRepository.findByCity(city);
    }

    @GetMapping("/find/work-name/{workNames}")
    public List<Person> findByWorkNames(@PathVariable String workNames) {
        return personRepository.findByWorkNames(workNames);
    }

    @GetMapping("/find/work-industries/{workIndustries}")
    public List<Person> findByWorkIndustries(@PathVariable String workIndustries) {
        return personRepository.findByWorkIndustries(workIndustries);
    }

    @GetMapping("/find/work-description/{workDescription}")
    public List<Person> findByWorkDescription(@PathVariable String workDescription) {
        return personRepository.findByWorkDescription(workDescription);
    }

    @GetMapping("/find/edu-name/{eduNames}")
    public List<Person> findByEduNames(@PathVariable String eduNames) {
        return personRepository.findByEduNames(eduNames);
    }

    @GetMapping("/find/edu-spec/{eduSpec}")
    public List<Person> findByEduSpec(@PathVariable String eduSpec) {
        return personRepository.findByEduSpec(eduSpec);
    }

    @GetMapping("/find/edu-place/{eduPlace}")
    public List<Person> findByEduPlace(@PathVariable String eduPlace) {
        return personRepository.findByEduPlace(eduPlace);
    }

    @GetMapping("/find/edu-description/{eduDescription}")
    public List<Person> findByEduDescription(@PathVariable String eduDescription) {
        return personRepository.findByEduDescription(eduDescription);
    }

    @GetMapping("/find/skill-name/{skillName}")
    public List<Person> findBySkillName(@PathVariable String skillName) {
        return personRepository.findBySkillName(skillName);
    }

    @PostMapping("/update")
    public int savePerson(@RequestBody List<Person> personList) {
        personRepository.saveAll(personList);
        return personList.size();
    }

    public static void main(String[] args) {

        SpringApplication.run(EportfolioElasticApplication.class, args);

    }

}
