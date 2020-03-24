import { element } from "./view/html-util.js";

export class App {
  mount () {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作をとめる
      event.preventDefault();

      // 追加するTodoアイテムの要素(li要素)を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;

      // Todoアイテムをコンテナに追加する
      containerElement.appendChild(todoItemElement);

      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      inputElement.value = "";

      console.log(`入力欄の値: ${inputElement.value}`);
    });
  }
}
