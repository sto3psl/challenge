<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");

const router = useRouter();
function handleSubmit() {
  window.isAuthorized = true;

  router.push(`/?name=${name.value}`);
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Login</h1>
      <!-- @todo remove for bug -->
      <form @submit.prevent="handleSubmit">
        <label>
          <div>What's your name?</div>
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            placeholder="..."
            required
          />
        </label>
        <button>Let's go</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  padding: 32px;
  background: yellow;
  border-radius: 16px;
  box-shadow: var(--shadow-elevation-high);
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
  border: none;
  border-bottom: 1px solid black;
  background: transparent;
}
</style>
