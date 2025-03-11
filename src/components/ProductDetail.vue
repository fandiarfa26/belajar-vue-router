<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

interface ProductType {
  id: number;
  name: string;
  price: number;
}

const isLoaded = ref<boolean>(false);
const isError = ref<boolean>(false);
const product = ref<ProductType | null>(null);
const route = useRoute();

watchEffect(() => {
  if (route.params.id) {
    fetch(`/api/product/${route.params.id}.json`)
      .then((res) => res.json())
      .then((data) => {
        product.value = data;
        isLoaded.value = true;
      })
      .catch((err) => {
        console.error(`Failed to fetch product data: ${err}`);
        isError.value = true;
        isLoaded.value = false;
      });
  }
});
</script>

<template>
  <template v-if="route.params.id">
    <div v-if="isLoaded">
      <template v-if="product">
        <h1>{{ product.id }} - {{ product.name }}</h1>
        <p>Harga: Rp {{ product.price }}</p>
      </template>
    </div>
    <div v-else-if="isError">
      <p>Failed to fetch product id: {{ route.params.id }}</p>
    </div>
    <div v-else>
      <p>Loading fetch product id: {{ route.params.id }}</p>
    </div>
  </template>
  <template v-else>
    <h1>No Product</h1>
    <p>Product ID empty.</p>
  </template>
</template>
