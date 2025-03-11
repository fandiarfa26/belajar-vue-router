<script setup lang="ts"></script>

<template>
  <ul>
    <li><RouterLink :to="{ name: 'user-profile' }">Profile</RouterLink></li>
    <li><RouterLink :to="{ name: 'user-order' }">Order</RouterLink></li>
    <li><RouterLink :to="{ name: 'user-wishlist' }">Wishlist</RouterLink></li>
  </ul>
</template>

<style scoped>
.router-link-exact-active {
  color: red;
  font-weight: bold;
}
</style>
