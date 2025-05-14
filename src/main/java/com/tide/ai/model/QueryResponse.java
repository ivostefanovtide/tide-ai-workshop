package com.tide.ai.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Response from the AI system for a query")
public class QueryResponse {
    @Schema(description = "The generated answer to the query", example = "To configure the API, you need to modify the application.properties file.")
    private String answer;
    
    @Schema(description = "References or sources used to generate the answer")
    private String[] references;
}
