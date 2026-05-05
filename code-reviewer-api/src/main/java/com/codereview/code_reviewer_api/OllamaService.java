package com.codereview.code_reviewer_api;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service // A service class is a class that contains the real work of my app
// This class is the bridge between the backend and Ollama contains the logic
// for talking to AI
public class OllamaService {
    private final RestTemplate restTemplate = new RestTemplate();

    public String reviewCode(String code, String level) {// Input is the code

        String url = "http://localhost:11434/api/generate";// sends a request to your local AI server

        HashMap<String, Object> data = new HashMap<>();// Container for the data
        data.put("model", "mistral");// Which model to use
        data.put("prompt", buildPrompt(code, level));
        data.put("stream", false);// Allows faster response and feels interactive

        Map<String, Object> response =(Map<String, Object>) restTemplate.postForObject(url, data, Map.class);// send data to ollama and return a response
        return response.get("response").toString();// send data to ollama and return a response
        // Rest template is a tool thats is used to send HTTP requests from your java
        // app to another server
    }

    private String buildPrompt(String code, String level) {// exact instructions to send
        if (level.equals("beginner")) {
            return """
                    You are a senior software engineer.

                    Review this code and return:
                    - Bugs
                    - Improvements
                    - Security issues

                    Code:
                    """ + code;
        } else if (level.equals("intermediate")) {
            return """
                    You are a senior software engineer.

                    Review this code and return:
                    - Bugs
                    - Improvements
                    - Security issues

                    Code:
                    """ + code;
        } else if (level.equals("advanced")) {
            return """
                    You are a senior software engineer.
                    Review this code and return:
                    - Bugs
                    - Improvements
                    - Security issues
                    Code:
                    """ + code;
        } else {
            return """
                    You are a senior software engineer.
                    Review this code and return:
                    - Bugs
                    - Improvements
                    - Security issues
                    Code:
                    """ + code;
        }
    }
}