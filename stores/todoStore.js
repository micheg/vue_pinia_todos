import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        lists: {},
    }),
    actions: {
        addList(listName)
        {
            this.lists[listName] = [];
        },
        removeList(listName)
        {
            delete this.lists[listName];
        },
        addTodo(listName, todo)
        {
            this.lists[listName].push({ text: todo, completed: false });
        },
        removeTodo(listName, index)
        {
            this.lists[listName].splice(index, 1);
        },
        toggleTodo(listName, index)
        {
            this.lists[listName][index].completed = !this.lists[listName][index].completed;
        },
        getTodos(listName)
        {
            return this.lists[listName] || [];
        },
    },
    persist: true, // Enable persistence
});
