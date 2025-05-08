# Critical Workflow Rules

## Core Principles

1. **Never Override or Create New Files Without:**
   - Searching the codebase for existing implementations
   - Verifying the current file structure
   - Understanding existing patterns

2. **Work Within Existing Structure:**
   - Maintain the current project architecture
   - Follow established patterns and conventions
   - Use existing components and utilities when possible

3. **Ask Before Making Changes:**
   - When unsure about implementation details
   - Before introducing new dependencies
   - Before making architectural changes

4. **Make Minimal, Necessary Changes:**
   - Focus on solving specific problems
   - Avoid unnecessary refactoring
   - Keep changes focused and purposeful

5. **Respect Current Architecture:**
   - Follow the established project structure
   - Maintain consistency with existing code
   - Preserve the current design patterns

## Consequences of Violating Rules

Violating these workflow rules may result in:
- Breaking existing functionality
- Creating unnecessary complexity
- Wasting time on rework
- Frustrating team members

## Project Structure

This is a React application built with Vite, following a standard modern React project structure:

```
ai-chat-bot/
├── src/              # Source code
│   ├── assets/       # Static assets
│   ├── components/   # React components
│   └── ...
├── public/           # Public static files
└── ...
```

## Development Guidelines

1. **Before Making Changes:**
   - Review existing code in the relevant area
   - Check for similar implementations
   - Understand the current patterns

2. **When Adding New Features:**
   - Follow the existing component structure
   - Use established styling patterns
   - Maintain consistent naming conventions

3. **Code Review Process:**
   - Ensure changes follow these workflow rules
   - Verify no unnecessary files are created
   - Check for consistency with existing code

Remember: The goal is to work WITH the codebase, not against it. 