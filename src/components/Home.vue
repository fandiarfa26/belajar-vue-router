<script setup lang="ts">
const { title } = defineProps({
  title: String,
});
</script>

<template>
  <h1>{{ title }}</h1>
  <p>This is the home page</p>
</template>

<style scoped></style>
