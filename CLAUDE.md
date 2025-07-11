# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production version (runs registry build first)
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build

### Code Quality

- `pnpm lint` - Run ESLint on all code
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm format` - Check code formatting with Prettier
- `pnpm format:fix` - Fix code formatting with Prettier

### Registry Management

- `pnpm build:registry` - Build component registry JSON files
- `pnpm dev:registry` - Build registry with local development URL

## Architecture Overview

### Component System

Inspira UI is built around a component registry system that generates Vue/Nuxt components from source files:

- **Registry Components** (`components/content/inspira/ui/`): Main UI components organized by category
- **Examples** (`components/content/inspira/examples/`): Demo implementations of components
- **Blocks** (`components/content/inspira/blocks/`): Pre-built component compositions
- **Registry Schema** (`registry/schema.ts`): TypeScript schemas defining component structure
- **Build System** (`scripts/build-registry.mts`): Generates JSON registry files in `public/r/`

### Documentation & Content

Uses `shadcn-docs-nuxt` framework with:

- **Content Layer** (`content/`): Markdown-based documentation organized hierarchically
- **Component Documentation**: Auto-generated from registry metadata
- **Examples Integration**: Live component previews embedded in docs

### Styling Architecture

- **Tailwind CSS**: Primary styling framework with custom configuration
- **CSS Variables**: Theme system using HSL color values
- **Component Styles**: Scoped styles within individual Vue components
- **Inspira UI Plugin** (`@inspira-ui/plugins`): Custom Tailwind plugin for component-specific utilities

### Key Technologies

- **Nuxt 3**: Vue-based full-stack framework
- **TypeScript**: Strict typing throughout codebase
- **Motion-v**: Animation library integration
- **Lenis**: Smooth scrolling
- **Three.js**: 3D graphics for globe and other components
- **Canvas Confetti**: Particle effects

## Development Guidelines

### Component Structure

Each registry component follows this pattern:

```
components/content/inspira/ui/[component-name]/
├── ComponentName.vue      # Main component
├── index.ts              # Export file
└── additional-files.vue  # Helper components if needed
```

### File Naming Conventions

- Vue components: PascalCase (e.g., `AnimatedBeam.vue`)
- Folders: kebab-case (e.g., `animated-beam/`)
- Markdown files: kebab-case or numbered (e.g., `1.introduction.md`)

### Code Style

- ESLint enforces Vue 3 composition API patterns
- Prettier with 100-character line width
- TypeScript required for `<script>` blocks in Vue files
- Template order: `<template>`, `<script>`, `<style>`

### Component Dependencies

- Use `cn()` utility from `~/lib/utils.ts` for conditional classes
- Import from registry index files (e.g., `from "./index.ts"`)
- External libraries managed through registry dependencies system

### Registry System

Components are registered through:

1. **Component Files**: Located in `components/content/inspira/ui/`
2. **Registry Entry**: Added to `registry/registry-lib.ts`
3. **Build Process**: `build-registry.mts` generates JSON files
4. **Documentation**: Markdown files in `content/2.components/`

The registry enables:

- Automatic component discovery
- Dependency management
- Code extraction for copy-paste installation
- Integration with documentation system

## Testing

No specific test framework is configured. Component testing should be done through the development server and example implementations.
