<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-2xl">Todo App</h1>
    </header>

    <main class="p-4">
      <div class="mb-4">
        <input
          v-model="newListName"
          @keyup.enter="createList"
          placeholder="New list name"
          class="border p-2 rounded mr-2"
        />
        <button
          @click="createList"
          class="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add List
        </button>
        <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(todos, listName) in todoStore.lists"
          :key="listName"
          class="bg-white p-4 rounded shadow"
        >
          <h2 class="text-xl font-bold">{{ listName }}</h2>
          <TodoList :listName="listName" />
          <button
            @click="deleteList(listName)"
            class="mt-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete List
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "./stores/todoStore";
import TodoList from "./components/TodoList.vue";

const newListName = ref("");
const errorMessage = ref("");
const todoStore = useTodoStore();

const createList = () => {
  if (newListName.value.trim()) {
    if (!todoStore.lists[newListName.value.trim()]) {
      todoStore.addList(newListName.value.trim());
      newListName.value = "";
      errorMessage.value = "";
    } else {
      errorMessage.value = `List with name "${newListName.value.trim()}" already exists.`;
    }
  }
};

const deleteList = (listName) => {
  todoStore.removeList(listName);
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
