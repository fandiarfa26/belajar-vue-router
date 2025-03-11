<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h1>Not Found: {{ route.path }}</h1>
  <p>Halaman tidak ditemukan.</p>
</template>
