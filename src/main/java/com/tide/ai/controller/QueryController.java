package com.tide.ai.controller;

import com.tide.ai.model.QueryRequest;
import com.tide.ai.model.QueryResponse;
import com.tide.ai.planner.Planner;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/query")
@Tag(name = "Query", description = "API for querying the AI system")
public class QueryController {

    private final Planner planner;

    public QueryController(Planner planner) {
        this.planner = planner;
    }

    @PostMapping
    @Operation(
        summary = "Process a query",
        description = "Submit a query to the AI system and get an answer with relevant references",
        responses = {
            @ApiResponse(
                responseCode = "200", 
                description = "Query processed successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = QueryResponse.class))
            )
        }
    )
    public Mono<QueryResponse> handleQuery(@RequestBody QueryRequest request) {
        return Mono.just(planner.processQuery(request));
    }
}
