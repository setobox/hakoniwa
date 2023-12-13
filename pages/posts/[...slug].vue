<script setup lang="ts">
const route = useRoute()
</script>
<template>
  <article flex="~ col items-center">
    <ContentDoc
      :path="route.params.slug ? `/posts/${route.params.slug[0]}` : '/posts'"
      >
      <template #not-found>
        <h2>Blog slug ({{ route.params.slug }}) not found</h2>
      </template>
    </ContentDoc>
    <NuxtLink to="/posts" v-if="route.params.slug">cd ..</NuxtLink>
    <NuxtLink to="/" v-else>cd ..</NuxtLink>
  </article>
</template>
