<template>
    <form v-on:submit.prevent>
      <input
      aria-label="check"
      v-model="todoStore.selectAll"
      type='checkbox'
      @change="toggleCompleted"/>
      <input
      aria-label="title"
      v-model="taskTitle"
      ref="taskTitleInput"
      v-on:keyup.enter="onEnter"
      />
    </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
} from 'vue';
import useTodoStore from '../pinia/todoStore';

export default defineComponent({
  emits: ['create-task', 'set-completed'],
  setup(props:any, context:any) {
    const todoStore = useTodoStore();
    const taskTitle:Ref<string> = ref('');
    const check:Ref<boolean> = ref(false);
    const taskTitleInput:Ref<HTMLElement | null> = ref(null);

    onMounted(async () => {
      if (taskTitleInput.value != null) {
        taskTitleInput.value.focus();
      }
    });

    return {
      todoStore,
      taskTitle,
      taskTitleInput,
      check,
      onEnter() {
        if (taskTitle.value == null || taskTitle.value === '') {
          alert('Task title cannot be empty');
        } else {
          context.emit('create-task', taskTitle.value);
          taskTitle.value = '';
        }
      },
      toggleCompleted() {
        context.emit('set-completed', check.value);
      },
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
</style>
