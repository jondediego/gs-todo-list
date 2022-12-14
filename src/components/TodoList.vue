<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div class="todo-list">
        <li v-for="(item, index) in todos" :key="index"
        v-on:dblclick="todoStore.startEdition(index)"
        :class="[item.editing ? 'editing': '']">
            <input
            v-if="item.editing === false"
            aria-label="check"
            v-model="item.completed"
            type='checkbox'
            :checked="item.completed"
            @change="itemCompletedChange"
            />
            <span class="view"
            v-if="item.editing === false">
                {{item.title}}
            </span>
            <base-edit-item
            v-if="item.editing === true"
            :initValue="item.title"
            @save-edition="saveEdition($event, index)"
            @discard-edition="todoStore.stopEdition(index)"
            />
            <div v-if="item.editing === false"
            class="destroy"
            @click="todoStore.deleteItem(index)"></div>
        </li>
    </div>
</template>

<script lang="ts">
/* eslint-disable max-len */
import {
  defineComponent,
} from 'vue';
import useTodoStore from '../pinia/todoStore';
import BaseEditItem from './Base/BaseEditItem.vue';
import TodoItem from '../model/todo';

export default defineComponent({
  emits: ['completed-change'],
  props: {
    todos: { type: Object as () => TodoItem[] },
  },
  components: {
    BaseEditItem,
  },
  setup(props: any, context: any) {
    const todoStore = useTodoStore();
    return {
      todoStore,
      itemCompletedChange() {
        context.emit('completed-change');
      },
      saveEdition(val: string, index: number) {
        todoStore.saveEdition(val, index);
      },
    };
  },
});
</script>

<style scoped>
.todo-list {
margin: 0;
padding: 0;
list-style: none;
}

.todo-list li {
position: relative;
font-size: 24px;
border-bottom: 1px solid #ededed;
min-height: 25px;
}

.todo-list li:last-child {
border-bottom: none;
}

.todo-list li.editing {
border-bottom: none;
padding: 0;
}

.todo-list li.editing .edit {
display: block;
width: 506px;
padding: 12px 16px;
margin: 0 0 0 43px;
}

.todo-list li.editing .view {
display: none;
}

.todo-list li .toggle {
text-align: center;
width: 40px;
/* auto, since non-WebKit browsers doesn't support input styling */
height: auto;
position: absolute;
top: 0;
bottom: 0;
margin: auto 0;
border: none; /* Mobile Safari */
-webkit-appearance: none;
appearance: none;
}

.todo-list li .toggle {
opacity: 0;
}

.todo-list li .toggle + label {
/*
    Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
*/
background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
background-repeat: no-repeat;
background-position: center left;
}

.todo-list li .toggle:checked + label {
background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
word-break: break-all;
padding: 15px 15px 15px 60px;
display: block;
line-height: 1.2;
transition: color 0.4s;
}

.todo-list li.completed label {
color: #d9d9d9;
text-decoration: line-through;
}

.todo-list li .destroy {
display: none;
float: right;
top: 0;
right: 10px;
bottom: 0;
width: 40px;
height: 40px;
margin: auto 0;
font-size: 30px;
color: #cc9a9a;
margin-bottom: 11px;
transition: color 0.2s ease-out;
}
.todo-list li .destroy:hover {
  cursor: pointer;
}
.todo-list li .destroy:hover {
color: #af5b5e;
}

.todo-list li .destroy:after {
content: '??';
}

.todo-list li:hover .destroy {
display: block;
}

.todo-list li .edit {
display: none;
}

.todo-list li.editing:last-child {
margin-bottom: -1px;
}
</style>
