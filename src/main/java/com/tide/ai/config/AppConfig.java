package com.tide.ai.config;

import org.apache.http.HttpHost;
import org.opensearch.client.RestClient;
import org.opensearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {

    @Value("${aws.opensearch.endpoint}")
    private String openSearchEndpoint;

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public RestHighLevelClient openSearchClient() {
        return new RestHighLevelClient(
            RestClient.builder(HttpHost.create(openSearchEndpoint))
        );
    }
}
