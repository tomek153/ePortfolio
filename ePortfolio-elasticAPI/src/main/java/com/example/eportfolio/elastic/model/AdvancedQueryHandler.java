package com.example.eportfolio.elastic.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AdvancedQueryHandler {

    private String queryText;
    private String queryCity;
    private String queryWorkIndustries;
    private String queryEduSpec;

    public AdvancedQueryHandler(@JsonProperty("text") String queryText,
                                @JsonProperty("city") String queryCity,
                                @JsonProperty("work") String queryWorkIndustries,
                                @JsonProperty("edu") String queryEduSpec){
        this.queryText = queryText;
        this.queryCity = queryCity;
        this.queryWorkIndustries = queryWorkIndustries;
        this.queryEduSpec = queryEduSpec;
    }

    public String getQueryText() {
        return queryText;
    }

    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }

    public String getQueryCity() {
        return queryCity;
    }

    public void setQueryCity(String queryCity) {
        this.queryCity = queryCity;
    }

    public String getQueryWorkIndustries() {
        return queryWorkIndustries;
    }

    public void setQueryWorkIndustries(String queryWorkIndustries) {
        this.queryWorkIndustries = queryWorkIndustries;
    }

    public String getQueryEduSpec() {
        return queryEduSpec;
    }

    public void setQueryEduSpec(String queryEduSpec) {
        this.queryEduSpec = queryEduSpec;
    }
}
