<script setup lang="ts">
defineProps<{
   path?: string
}>()

</script>

<template>
  <div>
    <NuxtLink v-if="path" :to="path">
      <div v-bind="$attrs" w-1em h-1em ></div>
    </NuxtLink>
  </div>
</template>
