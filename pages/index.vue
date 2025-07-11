<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div class="mx-auto max-w-4xl text-center">
        <TextGenerateEffect
          words="Build Beautiful Websites"
          class="text-6xl font-bold tracking-tight text-black dark:text-white md:text-8xl"
          :duration="0.5"
        />
        <TextGenerateEffect
          words="with Minimal Effort"
          class="mt-4 text-6xl font-bold tracking-tight text-gray-600 dark:text-gray-400 md:text-8xl"
          :duration="0.5"
          :delay="0.3"
        />

        <div class="mt-8 space-y-4">
          <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Create stunning, modern interfaces with our collection of minimalist components built
            for Vue & Nuxt.
          </p>

          <div class="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <NuxtLink to="/components">
              <RainbowButton class="px-8 py-3 text-lg font-semibold">
                Explore Components
              </RainbowButton>
            </NuxtLink>
            <NuxtLink
              to="https://github.com/unovue/inspira-ui"
              target="_blank"
            >
              <UiButton
                variant="outline"
                class="px-8 py-3 text-lg font-semibold"
              >
                View on GitHub
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Subtle background pattern -->
      <div class="absolute inset-0 -z-10 opacity-5">
        <PatternBackground
          pattern="dots"
          :size="1"
          :spacing="20"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="text-4xl font-bold text-black dark:text-white md:text-5xl">
            Everything You Need
          </h2>
          <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Powerful components designed for modern development
          </p>
        </div>

        <BentoGrid class="mx-auto max-w-6xl">
          <BentoGridItem
            class="col-span-1 row-span-1 md:col-span-2"
            title="Beautiful Animations"
            description="Smooth, performant animations that bring your interfaces to life"
          >
            <div class="flex h-full items-center justify-center">
              <SparklesText
                text="Animated"
                class="text-4xl font-bold"
                :sparkles-count="10"
              />
            </div>
          </BentoGridItem>

          <BentoGridItem
            class="col-span-1 row-span-1"
            title="TypeScript Ready"
            description="Full TypeScript support for better development experience"
          >
            <div class="flex h-full items-center justify-center">
              <div class="rounded-lg bg-blue-500/10 p-4">
                <Icon
                  name="logos:typescript-icon"
                  size="48"
                />
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem
            class="col-span-1 row-span-1"
            title="Growing Library"
            description="Constantly expanding collection of components"
          >
            <div class="flex h-full items-center justify-center">
              <NumberTicker
                :value="150"
                class="text-4xl font-bold text-black dark:text-white"
              />
              <span class="ml-2 text-2xl text-gray-600 dark:text-gray-300">+</span>
            </div>
          </BentoGridItem>

          <BentoGridItem
            class="col-span-1 row-span-1 md:col-span-2"
            title="Open Source"
            description="Free to use, modify, and contribute to"
          >
            <div class="flex h-full items-center justify-center">
              <div class="flex items-center space-x-4">
                <Icon
                  name="ph:heart-fill"
                  size="32"
                  class="text-red-500"
                />
                <span class="text-2xl font-semibold text-black dark:text-white">MIT License</span>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-4xl font-bold text-black dark:text-white md:text-5xl">
          Ready to Get Started?
        </h2>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Join thousands of developers building beautiful applications
        </p>

        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink to="/getting-started/installation">
            <ShimmerButton class="px-8 py-3 text-lg font-semibold"> Get Started </ShimmerButton>
          </NuxtLink>
          <NuxtLink to="/components">
            <UiButton
              variant="ghost"
              class="px-8 py-3 text-lg font-semibold"
            >
              Browse Components
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-12 dark:border-gray-800">
      <div class="mx-auto max-w-7xl px-4 text-center">
        <p class="text-gray-600 dark:text-gray-400">Built with ❤️ by the Inspira UI team</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const config = useConfig();

useSeoMeta({
  title: `Inspira UI: Build beautiful websites using Vue & Nuxt`,
  ogTitle: `Inspira UI: Build beautiful websites using Vue & Nuxt`,
  description:
    "Open Source components to build stunning animated interfaces effortlessly using Vue & Nuxt.",
  ogDescription:
    "Open Source components to build stunning animated interfaces effortlessly using Vue & Nuxt.",
  ogImage: config.value.site.ogImage,
  twitterCard: "summary_large_image",
});
</script>
