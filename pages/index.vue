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
  <div flex="~ col gap2" h-full w-full py5 px5 md:px20>
    <div flex-auto></div>

    <div flex="~ col items-center">
      <div w-32 h-32 rounded-50% of-hidden mb-4>
        <img src="https://cdn.setobox.cn/0/magic33.png">
      </div>
      <div flex="~ col items-center">
        <div text-4xl>Setobox</div>
        <div text-2xl>while(!dead){time--;exp++;}</div>
      </div>
      <div m-auto my-4 w-72 h-1px border="b base" />
      <div flex="~ gap2">
        <button @click="toggleDarkMode" text-2xl>
          <div i-carbon:sun dark:i-carbon:moon w-1em h-1em />
        </button>
        <NuxtLink to="https://github.com/setobox" text-2xl>
          <div i-carbon-logo-github w-1em h-1em ></div>
        </NuxtLink>
      </div>

    </div>

    <div flex-auto flex="~ col items-center justify-end">
      <div>
        2023-PRESENT © Setobox
      </div>
      <a href="https://icp.gov.moe/?keyword=20232190" target="_blank">萌ICP备20232190号</a>
    </div>
  </div>
</template>
