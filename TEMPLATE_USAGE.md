# Using the Nuxt + Shadcn Template

This guide explains how to use the template located in the `/template` directory.

## Quick Start

### Option 1: Copy the Template Directory

1. **Copy the entire `/template` directory to a new location:**

```bash
cp -r template my-new-project
cd my-new-project
```

2. **Remove the pnpm-lock.yaml to get a fresh start:**

```bash
rm pnpm-lock.yaml
```

3. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

4. **Start the development server:**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Use as a Reference

You can also use the template as a reference for setting up your own project:

1. Create a new Nuxt project:
```bash
npx nuxi@latest init my-project
```

2. Copy the configuration from the template:
   - `tailwind.config.js` - Tailwind configuration with shadcn theme
   - `assets/css/main.css` - CSS variables and Tailwind directives
   - `lib/utils.ts` - Utility functions
   - `.vscode/` - VS Code settings

3. Install the required dependencies:
```bash
cd my-project
pnpm add @vueuse/core class-variance-authority motion-v
pnpm add -D @nuxtjs/tailwindcss clsx tailwind-merge tailwindcss-animate @inspira-ui/plugins
```

## What's Included

The template includes:

- **Nuxt 3** - Latest Nuxt framework
- **TypeScript** - Full TypeScript support
- **Tailwind CSS** - With shadcn-style theming
- **Motion-v** - Animation library
- **Example Components** - Button component and demo page
- **Dark Mode** - Pre-configured dark mode support

## Next Steps

1. **Customize the theme** - Edit `assets/css/main.css` to change colors
2. **Add components from Inspira UI** - Visit [inspira-ui.com](https://inspira-ui.com)
3. **Build your app** - Start building your application!

## Need Help?

- Check the [template README](./template/README.md) for detailed documentation
- Visit [Inspira UI Documentation](https://inspira-ui.com)
- Review the example page in `template/pages/index.vue`

## Template Structure

```
template/
├── assets/css/main.css          # Tailwind + shadcn styles
├── components/ui/               # UI components
├── lib/utils.ts                 # Utility functions
├── pages/index.vue              # Example page
├── app.vue                      # Root component
├── nuxt.config.ts               # Nuxt configuration
├── tailwind.config.js           # Tailwind configuration
├── package.json                 # Dependencies
└── README.md                    # Template documentation
```

Happy coding! 🚀
