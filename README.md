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

---

Remember, with great AI power comes great responsibility. Use this application for good, not to build Skynet!

*"Live long and prosper with Tide AI"* 🖖

---

Made with ❤️ and a lot of coffee ☕ (the primary fuel source of developers across all galaxies) 