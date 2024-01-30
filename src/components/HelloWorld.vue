<script setup lang="ts">
import { Ref, ref } from "vue";
import { Person } from "../types/person";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps<{ msg: string }>();

const people: Ref<Person[]> = ref([]);
const firstName = ref("");
const lastName = ref("");
const dateOfBirth = ref();

import { onMounted } from "vue";
import { addPerson, deletePerson, getPeople } from "./httpHandler";
import { ObjectId } from "mongodb";

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

  firstName.value = "";
  lastName.value = "";
  dateOfBirth.value = undefined;

  await fetchPeople();
};

const deletePersonAndRefetch = async (id?: ObjectId) => {
  if (id === undefined) return;

  await deletePerson(id);

  await fetchPeople();
};
</script>

<template>
  <h1>{{ msg }}</h1>

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
    <VueDatePicker
      v-model="dateOfBirth"
      model-type="MM/dd/yyyy"
      :hide-navigation="['time']"
    />
    <button type="button" @click="addPersonAndRefetch">Add</button>
  </p>
  <p>
    People:
    <li v-for="person in people">
      {{ person.name
      }}<button @click="() => deletePersonAndRefetch(person._id)">
        Delete
      </button>
    </li>
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
