<script setup lang="ts">
const { requestId } = defineProps(["requestId"]);
console.info("requestId:", requestId);
</script>

<template>
  <h2>User Profile</h2>
</template>
