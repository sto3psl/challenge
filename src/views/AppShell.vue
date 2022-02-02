<script setup>
import { computed, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import SearchForm from "../components/SearchForm.vue";
import StockListItem from "../components/StockListItem.vue";

const route = useRoute();

const defaultStocks = [
  { "1. symbol": "AAPL", "2. name": "Apple Inc" },
  { "1. symbol": "MSFT", "2. name": "Microsoft Corporation" },
  { "1. symbol": "NET", "2. name": "Cloudflare Inc - Class A" },
  { "1. symbol": "GOOG", "2. name": "Alphabet Inc - Class C" },
];

const name = ref(route.query.name);

const searchResults = ref([]);

const resultList = computed(() =>
  searchResults.value.length ? searchResults.value : defaultStocks
);
</script>

<template>
  <header>
    Hello, {{ name }}
    <SearchForm v-model="searchResults" />
  </header>
  <nav>
    <ul>
      <StockListItem
        v-for="stock in resultList"
        :key="stock['1. symbol']"
        :stock="stock"
      />
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  grid-area: header;
}
nav {
  grid-area: nav;
}
main {
  grid-area: main;
  border-left: 1px solid red;
  background-color: white;
}

ul {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

<style>
#app {
  display: grid;
  grid-template:
    "header main"
    "nav main";

  grid-template-columns: 320px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}
</style>
