package com.tide.ai.search;

import com.tide.ai.model.DataSource;

import java.util.List;

public interface SearchService {
    List<String> search(String query, DataSource dataSource);
    List<String> searchWithEmbedding(String query, DataSource dataSource); // For RAG
}
