<script setup lang="ts">
import { Ref, ref } from "vue";
import { Person } from "../types/person";

defineProps<{ msg: string }>();

const count = ref(0);
const people: Ref<Person[]> = ref([]);
const firstName = ref("");
const lastName = ref("");
const dateOfBirth = ref("");

import { onMounted } from "vue";
import { addPerson, getPeople } from "./httpHandler";

onMounted(async () => {
  await fetchPeople();

  console.log(people);
});

const fetchPeople = async () => {
  const fetchedPeople = await getPeople();
  people.value = fetchedPeople;
};

const addPersonAndRefetch = async () => {
  await addPerson({
    name: `${firstName.value} ${lastName.value}`,
    birthDate: dateOfBirth.value,
  });

  await fetchPeople();
};
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
    Create new:
    <label for="firstName">
      <h2>First Name</h2>
    </label>
    <input type="text" v-model="firstName" />
    <label for="lastName">
      <h2>Last Name</h2>
    </label>
    <input type="text" v-model="lastName" />
    <label for="dateOfBirth">
      <h2>Date of Birth</h2>
    </label>
    <input type="text" v-model="dateOfBirth" />
    <button type="button" @click="addPersonAndRefetch">Add</button>
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
