package com.example.eportfolio.elastic;

import com.example.eportfolio.elastic.database.MyTask;

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

		MyTask job = new MyTask();
		t.scheduleAtFixedRate(job, 0, 300000);

	}

}
