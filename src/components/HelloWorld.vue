<script setup lang="ts">
import { Ref, ref } from "vue";
import { Person } from "../types/person";

defineProps<{ msg: string }>();

const count = ref(0);
const people: Ref<Person[]> = ref([]);

import { onMounted } from "vue";
import { getPeople } from "./httpHandler";

onMounted(async () => {
  const fetchedPeople = await getPeople();
  people.value = fetchedPeople;

  console.log(people);
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    People:
    <li v-for="person in people">
      {{ person.name }}
    </li>
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
