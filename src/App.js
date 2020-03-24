import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  mount () {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // TodoListModel の状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();

      const todoListView = new TodoListView();

      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });

      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら新しいTodoItemModelを追加する
    // let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作をとめる
      event.preventDefault();

      this.handleAdd(inputElement.value);

      inputElement.value = "";
    });
  }
}
