package com.tide.ai.search;

import com.tide.ai.model.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("braveSearchService")
public class BraveSearchService implements SearchService {

    private final WebClient webClient;
    private final String apiKey;
    private final String apiPath;
    private final int resultsCount;

    public BraveSearchService(
            WebClient.Builder webClientBuilder, 
            @Value("${brave.search.api-key}") String apiKey,
            @Value("${brave.search.base-url}") String baseUrl,
            @Value("${brave.search.api-path}") String apiPath,
            @Value("${brave.search.results-count}") int resultsCount) {
        
        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .build();
        this.apiKey = apiKey;
        this.apiPath = apiPath;
        this.resultsCount = resultsCount;
    }

    @Override
    public List<String> search(String query, DataSource dataSource) {
        try {
            Map response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path(apiPath)
                            .queryParam("q", query)
                            .queryParam("count", resultsCount)
                            .build())
                    .header("Accept", "application/json")
                    .header("Accept-Encoding", "gzip")
                    .header("X-Subscription-Token", apiKey)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<String> results = new ArrayList<>();
            
            // Get web results from the response
            if (response != null && response.containsKey("web") && response.get("web") instanceof Map) {
                Map webResults = (Map) response.get("web");
                if (webResults.containsKey("results") && webResults.get("results") instanceof List) {
                    List<Map<String, Object>> webItems = (List<Map<String, Object>>) webResults.get("results");
                    
                    // Process up to resultsCount results
                    for (int i = 0; i < Math.min(webItems.size(), resultsCount); i++) {
                        Map<String, Object> item = webItems.get(i);
                        StringBuilder sb = new StringBuilder();
                        
                        // Format as Title, URL, and Description
                        if (item.containsKey("title")) {
                            sb.append("Title: ").append(item.get("title")).append("\n");
                        }
                        
                        if (item.containsKey("url")) {
                            sb.append("URL: ").append(item.get("url")).append("\n");
                        }
                        
                        if (item.containsKey("description")) {
                            sb.append("Description: ").append(item.get("description")).append("\n");
                        }
                        
                        results.add(sb.toString());
                    }
                    
                    return results;
                }
            }
            
            return List.of("No results found or error in response format");
        } catch (Exception e) {
            return List.of("Error occurred while searching: " + e.getMessage());
        }
    }

    @Override
    public List<String> searchWithEmbedding(String query, DataSource dataSource) {
        // For Brave Search, we use the same implementation as regular search
        // since it doesn't have a specific embedding-based search API
        return search(query, dataSource);
    }
} 