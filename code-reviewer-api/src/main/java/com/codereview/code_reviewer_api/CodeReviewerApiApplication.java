package com.codereview.code_reviewer_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeReviewerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeReviewerApiApplication.class, args);
		System.out.println("Code Reviewer API is running...");
	}

}
