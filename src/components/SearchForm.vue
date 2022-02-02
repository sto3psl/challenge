<script setup>
import { ref, watch } from "vue";

defineProps({
  modelValue: Array,
});

const emit = defineEmits(["update:modelValue"]);
const searchTerm = ref("");

watch(searchTerm, async (value, _oldValue, onCleanup) => {
  if (!value.trim()) {
    emit("update:modelValue", []);
    return;
  }

  const searchParams = new URLSearchParams();

  searchParams.set("function", "SYMBOL_SEARCH");
  searchParams.set("keywords", value);
  searchParams.set("apikey", import.meta.env.VITE_API_KEY);

  const controller = new AbortController();

  onCleanup(() => {
    controller.abort();
  });

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?${searchParams}`,
      { signal: controller.signal }
    );

    const { bestMatches } = await response.json();

    emit(
      "update:modelValue",
      bestMatches.filter((info) => info["3. type"] === "Equity")
    );
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request aborted.");
    }
  }
});
</script>

<template>
  <form>
    <label>Search</label>
    <input v-model="searchTerm" type="search" placeholder="Disney" />
  </form>
</template>
