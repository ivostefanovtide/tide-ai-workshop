package com.tide.ai.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request for querying the AI system")
public class QueryRequest {
    @Schema(description = "The query text to process", example = "What's the answer to life the universe and everything?")
    private String query;
    
    @Schema(description = "The data source to search", example = "ALL")
    private DataSource dataSource; // Enum: ALL, CONFLUENCE, JIRA
    
    @Schema(description = "Whether to automatically discover the question type", defaultValue = "true")
    private boolean autoDiscovery;
}
