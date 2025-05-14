package com.tide.ai.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Available data sources for searching")
public enum DataSource {
    @Schema(description = "Search in all available data sources")
    ALL,
    
    @Schema(description = "Search only in Confluence")
    CONFLUENCE,
    
    @Schema(description = "Search only in Jira")
    JIRA
}