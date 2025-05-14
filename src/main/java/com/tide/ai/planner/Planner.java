package com.tide.ai.planner;

import com.tide.ai.model.QueryRequest;
import com.tide.ai.model.QueryResponse;

public interface Planner {
    QueryResponse processQuery(QueryRequest request);
}
