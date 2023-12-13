<template>
  <div flex="~ col" w-screen h-screen h-100dvh of-hidden>
    <NuxtLoadingIndicator />
    <NavBar />
    <main flex-auto>
      <slot />
    </main>
  </div>
</template>
