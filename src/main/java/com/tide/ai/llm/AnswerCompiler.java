package com.tide.ai.llm;

import java.util.List;

public interface AnswerCompiler {
    String generateAnswer(String prompt, List<String> context);
}
