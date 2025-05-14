package com.tide.ai.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tide AI API")
                        .description("API for Tide AI Backend Search Engine")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Tide AI Team")
                                .email("contact@tide.ai")));
    }
} 