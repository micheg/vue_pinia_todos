<template>
  <div>
    <div class="flex mb-2">
      <input
        v-model="newTodo"
        @keyup.enter="addNewTodo"
        placeholder="New todo"
        class="border p-2 rounded mr-2 flex-grow"
      />
      <button
        @click="addNewTodo"
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
    </div>
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="flex items-center mb-2"
      >
        <span
          :class="{ completed: todo.completed }"
          @click="toggleCompletion(index)"
          class="flex-grow cursor-pointer"
        >
          {{ todo.text }}
        </span>
        <button
          @click="deleteTodo(index)"
          class="ml-2 bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const props = defineProps({
  listName: {
    type: String,
    required: true,
  },
});

const newTodo = ref("");
const todoStore = useTodoStore();
const todos = todoStore.getTodos(props.listName);

const addNewTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(props.listName, newTodo.value.trim());
    newTodo.value = "";
  }
};

const deleteTodo = (index) => {
  todoStore.removeTodo(props.listName, index);
};

const toggleCompletion = (index) => {
  todoStore.toggleTodo(props.listName, index);
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
