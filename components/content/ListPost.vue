<script setup lang="ts">
const posts = await queryContent('posts').find()
console.log(posts)
</script>

<template>
  <ContentList path="/posts/" v-slot="{ list }">
    <NuxtLink v-for="article in list" :key="article._path" :to="article._path">
      <h2>{{ article.display || article.title }}</h2>
      <p>{{ article.description }}</p>
    </NuxtLink>
  </ContentList>
</template>
