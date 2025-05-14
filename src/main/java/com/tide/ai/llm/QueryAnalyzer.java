package com.tide.ai.llm;

import com.tide.ai.planner.QuestionType;

public interface QueryAnalyzer {
    QuestionType analyzeQuestion(String question);
}
