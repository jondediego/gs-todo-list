// The data of each todo item
export default class TodoItem {
    // Title of the item
    title: string;

    // State of the item
    completed: boolean;

    editing: boolean;

    constructor(
      title: string,
      completed: boolean,
      editing: boolean,
    ) {
      this.title = title;
      this.completed = completed;
      this.editing = editing;
    }
}
