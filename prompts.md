# Prompts Documentation

This document consolidates and explains the prompts used in the project to manage the behavior of neural network models.

## 1. System Prompts

### File: `src/core/prompts/system.ts`

The system prompts define the overall behavior and rules for the AI model. These include instructions for tool usage, file editing, and interaction modes (e.g., Plan Mode vs. Act Mode). Key components include:

- **TOOL USE**: Guidelines for using tools like `read_file`, `write_to_file`, `replace_in_file`, etc., with XML-style formatting.
- **EDITING FILES**: Instructions for choosing between `write_to_file` and `replace_in_file` based on the scope of changes.
- **ACT MODE vs. PLAN MODE**: Differentiates between modes for executing tasks and planning solutions.
- **CAPABILITIES**: Lists the tools and resources available to the AI, such as MCP servers and browser actions.
- **RULES**: Defines constraints and best practices for interacting with the user's environment.
- **OBJECTIVE**: Outlines the step-by-step process for analyzing and completing tasks.

### Example:
```xml
<read_file>
<path>src/main.js</path>
</read_file>
```

This prompt requests the content of a file at the specified path.

---

## 2. Response Prompts

### File: `src/core/prompts/responses.ts`

These prompts handle specific responses to user actions or errors. They include:

- **Error Messages**:
  - `toolDenied`: Indicates the user denied an operation.
  - `toolError`: Reports a tool execution failure.
  - `clineIgnoreError`: Alerts when access to a file is blocked by `.clineignore` settings.
- **Task Resumption**:
  - Provides instructions for resuming interrupted tasks in either Plan or Act mode.
- **Plan Mode Instructions**:
  - Guides the AI on how to gather information and architect solutions in Plan Mode.
- **File Editing Responses**:
  - `fileEditWithUserChanges`: Describes user edits and auto-formatting applied to a file.
  - `fileEditWithoutUserChanges`: Confirms successful file edits without user modifications.

### Example:
```typescript
formatResponse.toolError("An unexpected error occurred.")
```

This generates a message indicating a tool execution failure with the provided error details.

---

## 3. Custom Instructions

The system supports user-defined instructions through:

- **Settings Custom Instructions**: User-provided guidelines for specific tasks.
- **`.clineignore` and `.clinerules` Files**: Project-specific rules for file access and task execution.

These instructions are dynamically added to the system prompt to tailor the AI's behavior to the user's preferences.

---

## 4. YandexGPT Prompts

### File: `docs/providers/yandexcloud-examples.md`

The project includes specific examples and guidelines for prompting the YandexGPT models provided by Yandex Cloud. These prompts are tailored to the specific capabilities and strengths of the YandexGPT models.

Key components include:

- **Basic Prompting Principles**:
  - Be specific in formulating requests
  - Provide context for better understanding
  - Specify the desired format of the response

- **Development-Related Prompts**:
  - Code analysis and explanation prompts
  - Code refactoring prompts
  - Unit testing generation prompts
  - API documentation generation prompts

- **Language-Specific Guidelines**:
  - Optimizations for Russian language prompts
  - Technical translation examples
  - Specialized prompts for the summarization model

- **Model-Specific Recommendations**:
  - `yandexgpt` - Best for complex tasks and code generation
  - `yandexgpt-lite` - Optimized for quick responses and dialogues
  - `summarization` - Specialized for text summarization and large documents

### Example:
```
Объясни, что делает следующая функция:

```javascript
function throttle(func, ms) {
  // Function code here
}
```

Объясни принцип работы и возможные сценарии использования.
```

This prompt requests the YandexGPT model to analyze and explain a JavaScript function with its working principle and usage scenarios.

---

This document serves as a reference for understanding and extending the prompts used in this project.