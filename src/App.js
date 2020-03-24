import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount () {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // TodoListModel の状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      const todoListElement = element`<ul />`;

      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });

      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;

    });

    // フォームを送信したら新しいTodoItemModelを追加する
    // let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作をとめる
      event.preventDefault();

      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    });
  }
}
