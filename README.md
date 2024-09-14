# 🚀 AI Story Creator and Marketing Helper

## 📚 Project Overview

The AI Story Creator and Marketing Helper is an innovative, interactive platform designed to empower young writers and marketers. By leveraging cutting-edge AI technology, our platform offers a unique choose-your-own-adventure style experience for story creation, evaluation, improvement, and marketing strategy development.

### 🎯 Key Features

- 🌟 Interactive story idea generation with multiple presentation options ✅
- 📝 AI-assisted story creation and enhancement ✅
- 🧐 Automated content evaluation with scoring system ✅
- 🚀 Iterative content improvement based on AI suggestions ✅
- 🎭 Target audience and marketing persona creation (coming soon)
- 📱 Social media content generation (coming soon)
- 🎨 Marketing concept development (coming soon)

## 🏗️ Architecture

Our platform is built on a modular, "Lego-like" architecture using Node.js, Express, and Vue.js, with TypeScript for enhanced type safety. This approach offers flexibility, scalability, and maintainability.

### 🧩 Core Components

1. **AI Model Interface**: A standardized way to interact with various AI models (currently supports Llama via Ollama) ✅
2. **Story Generator**: Creates story options and enhances user-generated content ✅
3. **Content Evaluator**: Analyzes and scores content, providing improvement suggestions ✅
4. **Content Rewriter**: Offers AI-assisted content refinement based on evaluation ✅
5. **Marketing Analyzer**: Identifies target audiences and creates marketing personas (in progress)
6. **Social Media Content Creator**: Generates platform-specific social media content (planned)
7. **Marketing Concept Generator**: Develops marketing ideas and strategies (planned)

## 💻 Technology Stack

- **Backend**: Node.js with Express.js ✅
- **Frontend**: Vue.js ✅
- **Language**: TypeScript ✅
- **AI Integration**: Customizable (currently supports Llama via Ollama, expandable to GPT-4, Claude, etc.) ✅
- **Database**: MongoDB (planned)
- **Testing**: Jest (setup complete, tests to be implemented)
- **Deployment**: Docker and Kubernetes (planned)

## 🚶‍♂️ User Flow

1. User inputs an initial story idea
2. AI generates 5 unique presentation options
3. User selects a preferred option
4. User creates initial content based on the chosen option
5. AI enhances the user's content
6. Content is evaluated and scored by AI
7. If score < 9/10, user receives improvement suggestions
8. User can rewrite or accept the content
9. Steps 5-8 repeat until content is finalized (score >= 9/10 or user accepts)
10. Marketing analysis and strategy development (coming soon)

## 🛠️ Getting Started (for Developers)

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Ollama (for local AI model support)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/ai-story-marketing.git
   cd ai-story-marketing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your AI model credentials and other configurations
   ```

4. Start Ollama and run the Llama model:
   ```bash
   ollama run llama
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server should now be running at `http://localhost:3000`, and the frontend development server at `http://localhost:8080`.

## 🧪 Running Tests

To run the test suite:

```bash
npm test
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels. Please see our `CONTRIBUTING.md` file for guidelines on how to contribute to this project.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🔜 Next Steps

1. Implement marketing analysis features
2. Develop social media content generation
3. Create marketing concept generator
4. Enhance test coverage
5. Set up CI/CD pipeline
6. Prepare for beta testing

## 🙏 Acknowledgements

- Thanks to the Ollama team for providing an easy-to-use interface for the Llama model.
- Special thanks to all contributors and supporters of this project.

---

By leveraging cutting-edge AI technology and a modular, scalable architecture, the AI Story Creator and Marketing Helper aims to revolutionize how young writers and marketers learn and create. This project serves as a powerful tool for its users and showcases modern software development practices and AI integration.