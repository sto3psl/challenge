<script setup>
import { RouterLink } from "vue-router";

defineProps({
  stock: Object,
});
</script>

<template>
  <li>
    <RouterLink :to="`/${stock['1. symbol']}`">
      <div>{{ stock["1. symbol"] }}</div>
      <div>{{ stock["2. name"] }}</div>
    </RouterLink>
  </li>
</template>

<style scoped>
li {
  list-style-type: none;
}

li a {
  display: block;
  padding: 8px 16px;
  margin: 0 8px;
  border-radius: 4px;
  color: black;
  text-decoration: none;
}

.router-link-exact-active {
  color: blue;
  background: white;
}
</style>
