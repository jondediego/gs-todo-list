<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <div class="footer">
        <div class="todo-count">
            <strong>
                <span v-if="todoStore.getNumberActive == 1">
                    {{todoStore.getNumberActive}} item left
                </span>
                <span v-else>
                    {{todoStore.getNumberActive}} items left
                </span>
            </strong>
        </div>
        <div class="filters">
                  <li>
                    <router-link
                    :class="[todoStore.filterCompleted === null ? 'selected' : '']"
                    to="/">All</router-link>
                  </li>
                  <li>
                    <router-link
                    :class="[todoStore.filterCompleted === false ? 'selected' : '']"
                    to="/active">Active</router-link>
                  </li>
                  <li>
                    <router-link
                    :class="[todoStore.filterCompleted === true ? 'selected' : '']"
                    to="/completed">Completed</router-link>
                  </li>
                </div>
                <div class="clear-completed">
                  <a @click="todoStore.clearCompleted()"
                    >Clear completed</a>
                </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable-next-line vuejs-accessibility/click-events-have-key-events */
import {
  defineComponent,
} from 'vue';
import useTodoStore from '../pinia/todoStore';

export default defineComponent({
  emits: ['create-task', 'set-completed'],
  setup(props:any, context:any) {
    const todoStore = useTodoStore();

    return {
      todoStore,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
color: #777;
padding: 10px 15px;
height: 20px;
text-align: center;
border-top: 1px solid #e6e6e6;
}

.footer:before {
content: '';
position: absolute;
right: 0;
bottom: 0;
left: 0;
height: 50px;
overflow: hidden;
box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
            0 8px 0 -3px #f6f6f6,
            0 9px 1px -3px rgba(0, 0, 0, 0.2),
            0 16px 0 -6px #f6f6f6,
            0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
float: left;
text-align: left;
}

.todo-count strong {
font-weight: 300;
}

.filters {
margin: auto;
padding: 0;
list-style: none;
position: absolute;
right: 0;
left: 0;
width: 216px;
display: inline-block;
}

.filters li {
display: inline;
}

.filters li a {
color: inherit;
margin: 3px;
padding: 3px 7px;
text-decoration: none;
border: 1px solid transparent;
border-radius: 3px;
}

.filters li a:hover {
border-color: rgba(175, 47, 47, 0.1);
cursor: pointer;
}

.filters li a.selected {
border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
float: right;
position: relative;
line-height: 20px;
text-decoration: none;
cursor: pointer;
}

.clear-completed:hover {
text-decoration: underline;
}

.info {
margin: 65px auto 0;
color: #bfbfbf;
font-size: 10px;
text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
text-align: center;
}

.info p {
line-height: 1;
}

.info a {
color: inherit;
text-decoration: none;
font-weight: 400;
}

.info a:hover {
text-decoration: underline;
}
</style>
