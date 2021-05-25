package com.example.eportfolio.elastic;

import com.example.eportfolio.elastic.model.AdvancedQueryHandler;
import com.example.eportfolio.elastic.model.Person;
import com.example.eportfolio.elastic.repository.PersonRepository;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@SpringBootApplication
@RestController
public class EportfolioElasticApplication {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    ResourceLoader resourceLoader;

    @PostMapping("/find/query")
    public Iterable<Person> findByQuery(@NonNull @RequestBody String queryString) throws IOException {
        StringBuilder queryNoStopwords = removeStopwords(queryString);

        QueryBuilder queryBuilder = QueryBuilders.queryStringQuery(queryNoStopwords.toString());
        return personRepository.search(queryBuilder);
    }

    @PostMapping("/find/query-advanced")
    public Iterable<Person> findByQueryAdvanced(@NonNull @RequestBody AdvancedQueryHandler advancedQueryHandler) throws IOException {

        String queryText = advancedQueryHandler.getQueryText();
        String queryCity = "/.*/";
        String queryEduSpec = "/.*/";
        String queryWorkIndustries = "/.*/";
        if (!advancedQueryHandler.getQueryCity().trim().equals("")) {
            queryCity = advancedQueryHandler.getQueryCity();
            queryCity = removeStopwords(queryCity).toString();
        }
        if (!advancedQueryHandler.getQueryEduSpec().trim().equals("")) {
            queryEduSpec = advancedQueryHandler.getQueryEduSpec();
        }
        if (!advancedQueryHandler.getQueryWorkIndustries().trim().equals("")) {
            queryWorkIndustries = advancedQueryHandler.getQueryWorkIndustries();
        }

        queryText = removeStopwords(queryText).toString();

        QueryBuilder queryBuilder = QueryBuilders.boolQuery()
                .must(QueryBuilders.queryStringQuery(queryText))
                .must(QueryBuilders.queryStringQuery(queryCity).defaultField("city"))
                .must(QueryBuilders.queryStringQuery(queryEduSpec).defaultField("eduSpec"))
                .must(QueryBuilders.queryStringQuery(queryWorkIndustries).defaultField("workIndustries"));

        return personRepository.search(queryBuilder);

    }

    private StringBuilder removeStopwords(String queryText) throws IOException {

        String[] wordsArray = queryText.split(" ");
        List<String> listOfWords = new ArrayList<String>(Arrays.asList(wordsArray));

        List<String> stopwordsList = new ArrayList<String>();
        Resource resource = resourceLoader.getResource("classpath:stopwords.txt");
        InputStream inputStream = resource.getInputStream();

        try (Scanner s = new Scanner(inputStream)) {
            while (s.hasNext()) {
                stopwordsList.add(s.next());
            }
        }

        StringBuilder query = new StringBuilder();
        for (String word : listOfWords) {
            if (!stopwordsList.contains(word)) {
                query.append(" ");
                query.append(word);
            }
        }
        return query;
    }

    /* DEBUG ONLY - do usuniecia
        @GetMapping("/find/all")
        public Iterable<Person> findAllPersons() {
            return personRepository.findAll();
        }
    */
    @GetMapping("/find/city/{city}")
    public List<Person> findByCity(@PathVariable String city) {
        return personRepository.findByCity(city.replace("-"," "));
    }

    @GetMapping("/find/work-name/{workNames}")
    public List<Person> findByWorkNames(@PathVariable String workNames) {
        return personRepository.findByWorkNames(workNames.replace("-"," "));
    }

    @GetMapping("/find/work-industries/{workIndustries}")
    public List<Person> findByWorkIndustries(@PathVariable String workIndustries) {
        return personRepository.findByWorkIndustries(workIndustries.replace("-"," "));
    }

    @GetMapping("/find/work-descriptions/{workDescriptions}")
    public List<Person> findByWorkDescriptions(@PathVariable String workDescriptions) {
        return personRepository.findByWorkDescriptions(workDescriptions.replace("-"," "));
    }

    @GetMapping("/find/edu-name/{eduNames}")
    public List<Person> findByEduNames(@PathVariable String eduNames) {
        return personRepository.findByEduNames(eduNames.replace("-"," "));
    }

    @GetMapping("/find/edu-spec/{eduSpec}")
    public List<Person> findByEduSpec(@PathVariable String eduSpec) {
        return personRepository.findByEduSpec(eduSpec.replace("-"," "));
    }

    @GetMapping("/find/edu-place/{eduPlace}")
    public List<Person> findByEduPlace(@PathVariable String eduPlace) {
        return personRepository.findByEduPlace(eduPlace.replace("-"," "));
    }

    @GetMapping("/find/edu-description/{eduDescription}")
    public List<Person> findByEduDescription(@PathVariable String eduDescription) {
        return personRepository.findByEduDescription(eduDescription.replace("-"," "));
    }

    @GetMapping("/find/skill-name/{skillName}")
    public List<Person> findBySkillName(@PathVariable String skillName) {
        return personRepository.findBySkillName(skillName.replace("-"," "));
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
