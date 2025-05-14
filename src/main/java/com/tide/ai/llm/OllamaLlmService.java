package com.tide.ai.llm;

import com.tide.ai.planner.QuestionType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Service("ollamaLlmService")
public class OllamaLlmService implements QueryAnalyzer, AnswerCompiler {

    private final WebClient webClient;
    private final String modelName;
    private final boolean useGenerateEndpoint; // Whether to use /api/generate instead of /api/chat

    public OllamaLlmService(
            WebClient.Builder webClientBuilder,
            @Value("${ollama.base-url:http://localhost:11434}") String ollamaBaseUrl,
            @Value("${ollama.model:llama3.2}") String modelName,
            @Value("${ollama.use-generate-endpoint:true}") boolean useGenerateEndpoint) {
        this.modelName = modelName;
        this.useGenerateEndpoint = useGenerateEndpoint;
        this.webClient = webClientBuilder.baseUrl(ollamaBaseUrl).build();
    }

    @Override
    public QuestionType analyzeQuestion(String question) {
        String prompt = "Analyze the following question and identify its type. Reply with only one word - either 'search', 'reason', or 'research': " + question;
        String result = invokeOllama(prompt).toLowerCase().trim();
        
        if (result.contains("search")) {
            return QuestionType.SEARCH;
        } else if (result.contains("reason")) {
            return QuestionType.REASON;
        } else if (result.contains("research")) {
            return QuestionType.RESEARCH;
        } else {
            // Default to SEARCH if we can't determine the type
            return QuestionType.SEARCH;
        }
    }

    @Override
    public String generateAnswer(String prompt, List<String> context) {
        String fullPrompt = prompt;
        if (context != null && !context.isEmpty()) {
            fullPrompt += "\nUse This Context as most recent:\n" + String.join("\n", context);
        }
        return invokeOllama(fullPrompt);
    }

    private String invokeOllama(String prompt) {
        try {
            if (useGenerateEndpoint) {
                return invokeOllamaGenerate(prompt);
            } else {
                return invokeOllamaChat(prompt);
            }
        } catch (Exception e) {
            // Fallback if there's an issue connecting to Ollama
            return "Unable to connect to Ollama. Error: " + e.getMessage();
        }
    }
    
    private String invokeOllamaGenerate(String prompt) {
        // Prepare the request body for /api/generate
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("prompt", prompt);
        requestBody.put("stream", false);
        
        return webClient.post()
            .uri("/api/generate")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(Map.class)
            .map(response -> {
                if (response.containsKey("response")) {
                    return (String) response.get("response");
                } else {
                    return "Error: Could not parse response from Ollama";
                }
            })
            .block();
    }
    
    private String invokeOllamaChat(String prompt) {
        // Create a message list with the user's prompt
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of(
            "role", "user",
            "content", prompt
        ));
        
        // Prepare the request body for /api/chat
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("messages", messages);
        requestBody.put("stream", false);
        
        return webClient.post()
            .uri("/api/chat")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(Map.class)
            .map(response -> {
                if (response.containsKey("message")) {
                    Map<String, String> message = (Map<String, String>) response.get("message");
                    return message.get("content");
                } else {
                    return "Error: Could not parse response from Ollama";
                }
            })
            .block();
    }
} 