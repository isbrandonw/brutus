# Nuxt + Shadcn Template

A minimal Nuxt 3 starter template with shadcn-style components, inspired by [Inspira UI](https://inspira-ui.com).

## 🚀 Features

- ⚡ **Nuxt 3** - The Intuitive Vue Framework
- 🎨 **Shadcn-style Design System** - Beautiful, accessible components
- 🌓 **Dark Mode** - Built-in dark mode support with CSS variables
- 📦 **Copy & Paste Components** - Add components from Inspira UI as needed
- 🔧 **Tailwind CSS** - Utility-first CSS framework
- 🚀 **TypeScript** - Full TypeScript support
- 🎭 **Motion** - Animation library integration with motion-v

## 📦 What's Included

This template includes the essential setup for building applications with shadcn-style components:

- **Tailwind CSS** configured with shadcn color system
- **CSS Variables** for theming (light/dark mode)
- **Utility Functions** (`cn` helper for class merging)
- **TypeScript** configuration
- **Example Page** with feature showcase and theme toggle

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

1. **Clone or download this template**

2. **Install dependencies**

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

3. **Start the development server**

```bash
# Using pnpm
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── assets/
│   └── css/
│       └── main.css          # Global styles with shadcn CSS variables
├── components/
│   └── ui/                   # Your UI components go here
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── pages/
│   └── index.vue             # Home page
├── public/                   # Static assets
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## 🎨 Adding Components

This template is designed to work seamlessly with [Inspira UI](https://inspira-ui.com) components. Here's how to add them:

### Method 1: Manual Copy & Paste

1. Visit [Inspira UI Components](https://inspira-ui.com/components)
2. Browse and select a component you want to use
3. Copy the component code
4. Create a new file in `components/ui/` (e.g., `components/ui/Button.vue`)
5. Paste the component code
6. Install any required dependencies listed in the component documentation

### Method 2: Using Inspira UI CLI (if available)

```bash
# Install the CLI
pnpm add -D @inspira-ui/cli

# Add a component
pnpm inspira-ui add button
```

### Example: Adding a Button Component

1. Create `components/ui/Button.vue`
2. Copy the button component code from [Inspira UI](https://inspira-ui.com)
3. Use it in your pages:

```vue
<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";
</script>
```

## 🎨 Customizing Theme

### Colors

Edit the CSS variables in `assets/css/main.css` to customize your color scheme:

```css
:root {
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other colors */
}
```

### Border Radius

Adjust the `--radius` variable in `assets/css/main.css`:

```css
:root {
  --radius: 0.625rem; /* Adjust this value */
}
```

### Tailwind Configuration

Modify `tailwind.config.js` to add custom utilities, extend the theme, or configure plugins.

## 🌓 Dark Mode

Dark mode is built-in using CSS variables. Toggle it by adding/removing the `dark` class on the `<html>` element:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

The example page includes a working theme toggle implementation.

## 📚 Learn More

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Inspira UI Documentation](https://inspira-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Motion-v Documentation](https://motion.dev/docs/vue)

## 🤝 Contributing

This is a template project. Feel free to customize it for your needs!

## 📄 License

MIT License - feel free to use this template for any project.

## 🙏 Acknowledgments

- [Inspira UI](https://inspira-ui.com) - For the amazing component library
- [shadcn/ui](https://ui.shadcn.com) - For the design system inspiration
- [Nuxt](https://nuxt.com) - For the awesome framework

---

**Happy coding! 🚀**

For more components and examples, visit [Inspira UI](https://inspira-ui.com)
