package com.example.eportfolio.elastic;

import com.example.eportfolio.elastic.database.UpdateIndex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.Timer;

@SpringBootApplication
@RestController
public class EportfolioElasticDatabase {

	public static void main(String[] args) {

		SpringApplication.run(EportfolioElasticDatabase.class, args);

		Timer t = new Timer();

		UpdateIndex job = new UpdateIndex();
		t.scheduleAtFixedRate(job, 0, 300000);

	}

}
