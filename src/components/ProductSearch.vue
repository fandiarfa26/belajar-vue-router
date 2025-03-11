<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

interface ProductType {
  id: number;
  name: string;
  price: number;
}

const products = ref<ProductType[]>([]);
const route = useRoute();
const search = ref(route.query.product || "");
const router = useRouter();

watchEffect(() => {
  router.replace({ name: "product-search", query: { product: search.value } });
  fetch(`/api/products.json`)
    .then((res) => res.json())
    .then((products) =>
      products.filter((product: ProductType) => {
        return product.name.toLowerCase().includes(search.value.toLowerCase());
      })
    )
    .then((data) => {
      products.value = data;
    });
});
</script>

<template>
  <h1>Products</h1>
  <form>
    <input type="search" v-model="search" placeholder="Search..." />
  </form>
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
