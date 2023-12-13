
<script setup lang="ts">
const color = useColorMode()
const isDark = computed<boolean>({
  get() {
    return color.value === 'dark'
  },
  set() {
    color.value = isDark.value ? 'light' : 'dark'
  },
})

const isAppearanceTransition = typeof document !== 'undefined'
  // @ts-expect-error: Transition API
  && document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function toggleDarkMode(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <header flex="~ items-center justify-between" w-screen px-8 py-6>
    <UnoIcon path="/" i-carbon-home text-4xl></UnoIcon>

    <div flex="~ items-center gap4" text-xl>
      <ContentNavigation v-slot="{ navigation }">
        <div v-for="link of navigation.sort((a, b) => a.sort - b.sort)" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </div>
      </ContentNavigation>

      <div mx-1 h-.5em w-1px border="l-2 base" />

      <UnoIcon path="https://github.com/setobox" i-carbon-logo-github text-2xl></UnoIcon>
      <button @click="toggleDarkMode" text-2xl>
        <UnoIcon i-carbon:sun dark:i-carbon:moon text-2xl></UnoIcon>
      </button>
    </div>
  </header>
</template>
