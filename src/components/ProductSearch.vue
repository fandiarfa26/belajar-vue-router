<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

interface ProductType {
  id: number;
  name: string;
  price: number;
}

const products = ref<ProductType[]>([]);
const route = useRoute();
const search = route.query.product || "";

watchEffect(() => {
  fetch(`/api/products.json`)
    .then((res) => res.json())
    .then((products) =>
      products.filter((product: ProductType) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      })
    )
    .then((data) => {
      products.value = data;
    });
});
</script>

<template>
  <h1>Products</h1>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
      </tr>
    </tbody>
  </table>
</template>
