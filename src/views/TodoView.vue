<template>
  <div class="todoapp">
    <h1>todos</h1>
    <TodoForm @create-task="createTask" @set-completed="setCompleted"/>
    <div :class="[todoStore.todoList.length > 0 ? '' : 'hidden']" id="main">
      <TodoList :todos="todoStore.getFilteredList"
       @completed-change="itemCompletedChange"></TodoList>
    </div>
    <div :class="[todoStore.todoList.length > 0 ? '' : 'hidden']"  id="footer">
      <TodoFooter></TodoFooter>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import { useRoute } from 'vue-router';
import useTodoStore from '../pinia/todoStore';

export default defineComponent({
  setup() {
    const todoStore = useTodoStore();
    const route = useRoute();
    console.group(JSON.stringify(route));
    // fetch the user information when params change
    watch(
      () => route.meta,
      (newMeta: any) => { todoStore.setFilter(newMeta.completeFilter); },
    );
    onMounted(async () => {
      todoStore.setFilter(route.meta.completeFilter as boolean);
    });
    return {
      todoStore,
      createTask(title:string) {
        todoStore.addTask(title);
      },
      setCompleted() {
        todoStore.updateCompleted();
      },
      itemCompletedChange() {
        todoStore.itemCompletedChange();
      },
    };
  },
  components: {
    TodoForm,
    TodoList,
    TodoFooter,
  },
});
</script>

<style scoped>
.todoapp h1 {
position: absolute;
top: -155px;
width: 100%;
font-size: 100px;
font-weight: 100;
text-align: center;
color: rgba(175, 47, 47, 0.15);
-webkit-text-rendering: optimizeLegibility;
-moz-text-rendering: optimizeLegibility;
text-rendering: optimizeLegibility;
}
</style>
