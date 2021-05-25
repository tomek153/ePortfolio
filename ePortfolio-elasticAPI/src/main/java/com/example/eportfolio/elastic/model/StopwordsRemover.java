package com.example.eportfolio.elastic.model;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class StopwordsRemover {

    public StringBuilder removeStopwords(String queryText, ResourceLoader resourceLoader) throws IOException {

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

}
