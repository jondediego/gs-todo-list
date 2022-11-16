import { defineStore } from 'pinia';
import TodoItem from '@/model/todo';

// Store used to store data returned by CommonController in backend
export default defineStore('common', {
  state: (): {
    // Todo items list
    todoList: TodoItem[],
    selectAll: boolean,
    // Null means all items should be shown
    filterCompleted: boolean | null,
  } => ({
    todoList: [],
    selectAll: false,
    filterCompleted: null,
  }),
  actions: {
    addTask(taskTitle: string) {
      this.todoList.push(new TodoItem(taskTitle, false, false));
    },
    updateCompleted() {
      this.todoList.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.completed = this.selectAll;
      });
    },
    itemCompletedChange() {
      const allCompleted = this.todoList.every((el) => el.completed === true);
      if (allCompleted) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    startEdition(index: number) {
      this.todoList[index].editing = true;
    },
    saveEdition(title: string, index: number) {
      this.todoList[index].editing = false;
      this.todoList[index].title = title;
      if (title === '') {
        this.todoList.splice(index, 1);
      }
    },
    stopEdition(index: number) {
      this.todoList[index].editing = false;
    },
    deleteItem(index: number) {
      this.todoList.splice(index, 1);
    },
    setFilter(val: boolean | null) {
      this.filterCompleted = val;
    },
    clearCompleted() {
      this.todoList = this.todoList.filter((el) => el.completed !== true);
    },
  },
  getters: {
    getNumberActive(state) {
      return state.todoList.filter((el) => el.completed === false).length;
    },
    getFilteredList(state) {
      return this.filterCompleted == null
        ? state.todoList
        : state.todoList.filter((el) => el.completed === this.filterCompleted);
    },
  },

});
