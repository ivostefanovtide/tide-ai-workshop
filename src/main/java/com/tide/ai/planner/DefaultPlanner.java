package com.tide.ai.planner;

import com.tide.ai.llm.AnswerCompiler;
import com.tide.ai.llm.QueryAnalyzer;
import com.tide.ai.model.QueryRequest;
import com.tide.ai.model.QueryResponse;
import com.tide.ai.search.SearchService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultPlanner implements Planner {

    private final QueryAnalyzer queryAnalyzer;
    private final AnswerCompiler answerCompiler;
    private final SearchService searchService;

    public DefaultPlanner(@Qualifier("ollamaLlmService") QueryAnalyzer queryAnalyzer,
                          @Qualifier("ollamaLlmService") AnswerCompiler answerCompiler,
                          @Qualifier("braveSearchService") SearchService searchService) {
        this.queryAnalyzer = queryAnalyzer;
        this.answerCompiler = answerCompiler;
        this.searchService = searchService;
    }

    @Override
    public QueryResponse processQuery(QueryRequest request) {
        if (!request.isAutoDiscovery()) {
            return executeSimpleSearch(request);
        }

        QuestionType questionType = queryAnalyzer.analyzeQuestion(request.getQuery());
        return switch (questionType) {
            case SEARCH -> executeSpecificPath(request);
            case REASON -> executeComplexPath(request);
            case RESEARCH -> executeKnowledgePath(request);
        };
    }

    private QueryResponse executeSimpleSearch(QueryRequest request) {
        List<String> results = searchService.search(request.getQuery(), request.getDataSource());
        String answer = answerCompiler.generateAnswer("Answer the following question using the results as they are more accurate coming from a search engine: " + request.getQuery(), results);
        QueryResponse response = new QueryResponse();
        response.setAnswer(answer);
        response.setReferences(results.toArray(new String[0]));
        return response;
    }

    private QueryResponse executeSpecificPath(QueryRequest request) {
        List<String> results = searchService.search(request.getQuery(), request.getDataSource());
        String answer = answerCompiler.generateAnswer("Answer the following question: " + request.getQuery(), results);
        QueryResponse response = new QueryResponse();
        response.setAnswer(answer);
        response.setReferences(results.toArray(new String[0]));
        return response;
    }

    private QueryResponse executeComplexPath(QueryRequest request) {
        List<String> parts = List.of(request.getQuery()); // Simplified splitting
        List<String> results = parts.stream()
                .flatMap(part -> searchService.searchWithEmbedding(part, request.getDataSource()).stream())
                .toList();
        String answer = answerCompiler.generateAnswer("Answer the following question:" + request.getQuery(), results);
        QueryResponse response = new QueryResponse();
        response.setAnswer(answer);
        response.setReferences(results.toArray(new String[0]));
        return response;
    }

    private QueryResponse executeKnowledgePath(QueryRequest request) {
        String generalKnowledge = answerCompiler.generateAnswer("Provide a general explanation for: " + request.getQuery(), List.of());
        List<String> internalResults = searchService.search(request.getQuery(), request.getDataSource());
        String finalPrompt = "Combine the following general knowledge with Tide-specific context to answer: " + request.getQuery() +
                "\nGeneral Knowledge: " + generalKnowledge;
        String answer = answerCompiler.generateAnswer(finalPrompt, internalResults);
        QueryResponse response = new QueryResponse();
        response.setAnswer(answer);
        response.setReferences(internalResults.toArray(new String[0]));
        return response;
    }
}
