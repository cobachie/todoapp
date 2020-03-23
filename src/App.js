console.log("App.js: loaded");

export class App {
  mount () {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");

    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作をとめる
      event.preventDefault();

      console.log(`入力欄の値: ${inputElement.value}`);
    });
  }
}
