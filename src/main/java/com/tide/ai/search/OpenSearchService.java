package com.tide.ai.search;

import com.tide.ai.model.DataSource;
import org.opensearch.client.RestHighLevelClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("openSearchService")
public class OpenSearchService implements SearchService {

    private final RestHighLevelClient client;

    public OpenSearchService(RestHighLevelClient client) {
        this.client = client;
    }

    @Override
    public List<String> search(String query, DataSource dataSource) {
        // Placeholder for OpenSearch keyword search
        return List.of("This is a mock in-memory result. It should be replaced with real search results");
    }

    @Override
    public List<String> searchWithEmbedding(String query, DataSource dataSource) {
        // Placeholder for OpenSearch KNN search with embeddings
        return List.of("This is a mock in-memory result. It should be replaced with real search results");
    }
}
