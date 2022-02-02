<template>
  <div class="container">
    <h1>
      {{ $route.params.stock }}
    </h1>
    <table v-if="stockMetadata['Weekly Time Series']">
      <thead>
        <tr>
          <th>Day</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[date, values] in Object.entries(
            stockMetadata['Weekly Time Series']
          )"
          :key="date"
        >
          <td>{{ date }}</td>
          <td>{{ values["4. close"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const stockMetadata = ref({});

watchEffect(async () => {
  const searchParams = new URLSearchParams();

  searchParams.set("function", "TIME_SERIES_WEEKLY");
  searchParams.set("symbol", route.params.stock);
  searchParams.set("apikey", import.meta.env.VITE_API_KEY);

  const response = await fetch(
    `https://www.alphavantage.co/query?${searchParams}`
  );

  stockMetadata.value = await response.json();
});
</script>

<style scoped>
.container {
  padding: 16px;
}
</style>
