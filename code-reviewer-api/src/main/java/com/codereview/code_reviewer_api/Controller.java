package com.codereview.code_reviewer_api;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")//Allows requests from the frontend
public class Controller {
    //ollamaservice variable
    private final OllamaService ollamaService;//Reference: https://medium.com/@aravindcsebe/building-an-ai-powered-spring-boot-application-with-ollama-a-complete-guide-4a7279ccbf97
//Constructor for ollamaService
    public Controller(OllamaService ollamaService){
        this.ollamaService = ollamaService;
    }
 @PostMapping("/review")
    public String review(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        String level = request.get("level");
        return ollamaService.reviewCode(code, level);
    }
    }
