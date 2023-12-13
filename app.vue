<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import './styles/global.css'

</script>
<template>
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'fade' }"/>
  </NuxtLayout>
</template>
