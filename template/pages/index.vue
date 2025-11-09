<template>
  <div class="flex min-h-screen flex-col items-center justify-center p-8">
    <div class="w-full max-w-4xl space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Nuxt + Shadcn Template
        </h1>
        <p class="text-lg text-muted-foreground">
          A minimal starter template with shadcn-style components powered by Inspira UI
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
        >
          <div class="flex flex-col space-y-3">
            <div
              class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            >
              {{ feature.icon }}
            </div>
            <h3 class="font-semibold text-foreground">{{ feature.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="flex flex-col items-center space-y-4 text-center mt-12">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold text-foreground">Ready to build?</h2>
          <p class="text-muted-foreground">Add components from Inspira UI to get started</p>
        </div>
        <div class="flex flex-wrap gap-4 justify-center">
          <a
            href="https://inspira-ui.com"
            target="_blank"
            class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse Components
          </a>
          <a
            href="https://inspira-ui.com/getting-started/installation"
            target="_blank"
            class="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View Docs
          </a>
        </div>
      </div>

      <!-- Theme Toggle Demo -->
      <div class="flex justify-center mt-12">
        <button
          class="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="toggleTheme"
        >
          {{ isDark ? "☀️ Light Mode" : "🌙 Dark Mode" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: "⚡",
    title: "Fast & Modern",
    description: "Built with Nuxt 3 and Vue 3 for optimal performance",
  },
  {
    icon: "🎨",
    title: "Shadcn Styling",
    description: "Beautiful, accessible components with shadcn design system",
  },
  {
    icon: "🌓",
    title: "Dark Mode",
    description: "Built-in dark mode support with CSS variables",
  },
  {
    icon: "📦",
    title: "Copy & Paste",
    description: "Add components from Inspira UI as needed",
  },
  {
    icon: "🔧",
    title: "Customizable",
    description: "Fully customizable with Tailwind CSS utilities",
  },
  {
    icon: "🚀",
    title: "TypeScript",
    description: "Full TypeScript support out of the box",
  },
];

const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Check initial theme preference
onMounted(() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>
