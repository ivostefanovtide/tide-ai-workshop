```txt  
   _____            _             _      ___ 
 |__   __| (_)     | |          / _ \  |_   _|
    | |     _     _| |    _    | |_| |   | |  
    | |    | |  / _` |  / _ \  |  _  |   | |  
    | |    | | | (_| | |  __/  | | | |  _| |_ 
    |_|    |_|  \__,_|  \___|  |_| |_| |_____|
                                          
```

# 🌊 Tide AI Workshop 🤖

> *"Help me, Tide AI workshop. You're my only hope."* - Probably a developer trying to build an AI app

Welcome to the Tide AI backend workshop! This repository contains everything you need to embark on your journey through the AI galaxy. Whether you're a padawan in the world of AI or a Jedi Master, you'll find something to enhance your skills here.

## 🚀 Table of Contents

- [The Prophecy (About)](#the-prophecy-about)
- [Assembling Your Lightsaber (Prerequisites)](#assembling-your-lightsaber-prerequisites)
- [Making the Kessel Run (Installation)](#making-the-kessel-run-installation)
- [Engaging Warp Drive (Running the Application)](#engaging-warp-drive-running-the-application)
- [The One API (Setting Up Ollama)](#the-one-api-setting-up-ollama)
- [The Fellowship of the Code (Contributing)](#the-fellowship-of-the-code-contributing)
- [Resistance Intel (Troubleshooting)](#resistance-intel-troubleshooting)
- [The Twelve-Factor App Methodology](#the-twelve-factor-app-methodology)
- [🔍 Implementing Search Service with Brave Search API](#implementing-search-service-with-brave-search-api)

## 🔮 The Prophecy (About)

This workshop is designed to help developers understand how to build AI-powered applications using Spring Boot and modern LLM technologies. It's like the Sorting Hat for AI - it'll guide you to where you need to be!

The application features:
- 🧠 Smart querying system with vector embeddings
- 🔍 Context-aware responses
- 🎨 Beautiful, responsive UI (That even a Klingon would admire)
- 🤝 Integration with various data sources

## ⚔️ Assembling Your Lightsaber (Prerequisites)

Before you can join the Academy, make sure you have:

- Java 17+ (The Force is strong with this JDK)
- Gradle 7.6+ (Your trusty droid companion)
- Git (For when you need to clone... but not the Clone Wars kind)
- Your favorite IDE (We don't discriminate between the Federation and the Empire)
- About 2GB of free space (Not as big as the Death Star, but still)
- A terminal and basic command-line skills (Your communicator to the mothership)

## 🚀 Making the Kessel Run (Installation)

Time to make the installation in less than 12 parsecs:

1. Clone this repository faster than the Millennium Falcon:
   ```bash
   git clone https://github.com/yourusername/tide-ai-backend-workshop.git
   cd tide-ai-backend-workshop
   ```

2. Build the project with Gradle (no Dilithium crystals required):
   ```bash
   ./gradlew build
   ```

3. Install the dependencies (gather your fellowship):
   ```bash
   ./gradlew dependencies
   ```

## 🖖 Engaging Warp Drive (Running the Application)

Ready to boldly go where no dev has gone before (your localhost)?

1. Start the application:
   ```bash
   ./gradlew bootRun
   ```

2. Navigate to [http://localhost:8081](http://localhost:8081) in your browser
   
   > "It's a local environment!" - Admiral Ackbar, probably

3. You should see the Tide AI interface, ready to assist you with your queries!

4. Press `Ctrl+C` in your terminal to stop the application (Red alert! Shutting down systems!)

## 💍 The One API (Setting Up Ollama)

One API to rule them all, one API to find them, one API to bring them all, and in the darkness bind them.

1. Install Ollama following the [official guide](https://ollama.ai/download)

2. Pull the models you want to use:
   ```bash
   # For a lightweight model (The Hobbit of models)
   ollama pull llama2

   # For a more powerful model (The Gandalf of models)
   ollama pull llama3
   ```

3. Configure the application to use your Ollama models:
   ```
   # In src/main/resources/application.properties
   ollama.api.base-url=http://localhost:11434
   ollama.model.default=llama3
   ```

4. Restart the application to apply changes:
   ```bash
   ./gradlew bootRun
   ```

## 🧙‍♂️ The Fellowship of the Code (Contributing)

Your contribution to the Resistance is welcome:

1. Fork the repo (Use the fork, Luke!)
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request and wait for the Council's approval

## 🤖 Resistance Intel (Troubleshooting)

Having trouble with the droids you're looking for?

- **Problem**: Application fails to start
  - **Solution**: Check if the port 8081 is already in use. Change it in `application.properties` if needed.

- **Problem**: Ollama is not responding
  - **Solution**: Ensure Ollama is running with `ollama serve`

- **Problem**: Dependencies are not resolving
  - **Solution**: Try running `./gradlew --refresh-dependencies`

- **Problem**: UI looks strange
  - **Solution**: Clear your browser cache, or as Yoda would say, "Clear cache you must"

## 🏗️ The Twelve-Factor App Methodology

This application follows the [Twelve-Factor App](https://12factor.net/) methodology for building modern, scalable, maintainable applications:

1. **Codebase**: One codebase tracked in Git, many deploys
   - Our single codebase is tracked in Git, with clear versioning
   - Different environments (development, staging, production) use the same codebase with different configs

2. **Dependencies**: Explicitly declared and isolated in build.gradle
   - All dependencies are explicitly declared in build.gradle
   - We use Gradle for dependency isolation, ensuring consistent builds across environments
   - Dependencies are never implicitly leaked from the surrounding system

3. **Config**: Stored in environment variables and application.properties
   - Configuration that varies between environments is stored in the environment
   - All config is externalized in application.properties and environment variables 
   - Config is strictly separated from code, following strict separation of config from code

4. **Backing Services**: Treated as attached resources (Ollama, Brave Search API)
   - External services (Ollama API, Brave Search) are treated as attached resources
   - No distinction between local and third-party services in the codebase
   - Resources can be attached and detached from deployments without code changes

5. **Build, Release, Run**: Strict separation using Gradle and Spring Boot
   - Build stage transforms code into an executable bundle
   - Release stage combines the build with config
   - Run stage runs the application in the execution environment
   - Each stage is strictly separated with clear artifact flow between them

6. **Processes**: Stateless processes with Spring Boot
   - The app executes as one or more stateless processes
   - Any data that needs to persist is stored in a backing service
   - Memory and filesystem can be used as brief, single-transaction cache

7. **Port Binding**: Services exported via port binding (8081)
   - The web app exports HTTP as a service by binding to a port
   - One app can become the backing service for another app
   - The application is completely self-contained with explicit port bindings

8. **Concurrency**: Scale out via the process model
   - Processes are first-class citizens
   - The application can scale horizontally across multiple processes
   - Process management is handled by the execution environment

9. **Disposability**: Fast startup and graceful shutdown
   - Processes can be started or stopped at any time
   - Robust against sudden death through graceful shutdown
   - Short startup time enables rapid deployment and scaling

10. **Dev/Prod Parity**: Keep development and production as similar as possible
    - The same codebase and dependencies in all environments
    - Backing services are the same or similar across environments
    - Continuous deployment with minimal time gap between development and production

11. **Logs**: Treated as event streams with Spring Boot logging
    - Logs are treated as event streams
    - No concern for routing or storage of output stream
    - Events captured by execution environment for archival and analysis

12. **Admin Processes**: Run admin tasks as one-off processes
    - Admin/management tasks run as one-off processes in identical environment
    - Shipped with application code to avoid synchronization issues
    - Uses the same isolation techniques, language, and dependencies as the regular processes

Following these principles helps create applications that can scale efficiently, be maintained easily, and deployed consistently across different environments.

For more details on each factor, visit the [Twelve-Factor App website](https://12factor.net/).

---

Remember, with great AI power comes great responsibility. Use this application for good, not to build Skynet!

*"Live long and prosper with Tide AI"* 🖖

---

Made with ❤️ and a lot of coffee ☕ (the primary fuel source of developers across all galaxies) 

## 🔍 Implementing Search Service with Brave Search API

To implement your own search service using the Brave Search API:

1. Sign up for a free API key at [Brave Search API](https://brave.com/search/api/) (get 2,000 free queries per month)

2. Create a new class that implements the `SearchService` interface:
   ```java
   @Service("braveSearchService")
   public class BraveSearchService implements SearchService {
       
       private final WebClient webClient;
       private final String apiKey;
       private final String apiPath;
       private final int resultsCount;
       
       public BraveSearchService(
               WebClient.Builder webClientBuilder, 
               @Value("${brave.search.api-key}") String apiKey,
               @Value("${brave.search.base-url}") String baseUrl,
               @Value("${brave.search.api-path}") String apiPath,
               @Value("${brave.search.results-count}") int resultsCount) {
           
           this.webClient = webClientBuilder
                   .baseUrl(baseUrl)
                   .build();
           this.apiKey = apiKey;
           this.apiPath = apiPath;
           this.resultsCount = resultsCount;
       }
       
       @Override
       public List<String> search(String query, DataSource dataSource) {
           try {
               Map response = webClient.get()
                       .uri(uriBuilder -> uriBuilder
                               .path(apiPath)
                               .queryParam("q", query)
                               .queryParam("count", resultsCount)
                               .build())
                       .header("Accept", "application/json")
                       .header("Accept-Encoding", "gzip")
                       .header("X-Subscription-Token", apiKey)
                       .retrieve()
                       .bodyToMono(Map.class)
                       .block();
   
               List<String> results = new ArrayList<>();
               
               // Get web results from the response
               if (response != null && response.containsKey("web") && response.get("web") instanceof Map) {
                   Map webResults = (Map) response.get("web");
                   if (webResults.containsKey("results") && webResults.get("results") instanceof List) {
                       List<Map<String, Object>> webItems = (List<Map<String, Object>>) webResults.get("results");
                       
                       // Process up to resultsCount results
                       for (int i = 0; i < Math.min(webItems.size(), resultsCount); i++) {
                           Map<String, Object> item = webItems.get(i);
                           StringBuilder sb = new StringBuilder();
                           
                           // Format as Title, URL, and Description
                           if (item.containsKey("title")) {
                               sb.append("Title: ").append(item.get("title")).append("\n");
                           }
                           
                           if (item.containsKey("url")) {
                               sb.append("URL: ").append(item.get("url")).append("\n");
                           }
                           
                           if (item.containsKey("description")) {
                               sb.append("Description: ").append(item.get("description")).append("\n");
                           }
                           
                           results.add(sb.toString());
                       }
                       
                       return results;
                   }
               }
               
               return List.of("No results found or error in response format");
           } catch (Exception e) {
               return List.of("Error occurred while searching: " + e.getMessage());
           }
       }
       
       @Override
       public List<String> searchWithEmbedding(String query, DataSource dataSource) {
           // For Brave Search, we use the same implementation as regular search
           // since it doesn't have a specific embedding-based search API
           return search(query, dataSource);
       }
   }
   ```

3. Add the following Brave Search configuration to `application.properties`:
   ```properties
   # Brave Search configuration
   brave.search.api-key=YOUR_API_KEY_HERE
   brave.search.base-url=https://api.search.brave.com
   brave.search.api-path=/res/v1/web/search
   brave.search.results-count=5
   ```

4. Configure your application to use the BraveSearchService by ensuring it gets autowired correctly in your dependency injection setup.

Note: Be sure to respect Brave's usage terms and rate limits. The free tier provides up to 2,000 queries per month at 1 query per second, which should be sufficient for development and testing purposes.

