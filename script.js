const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

addButton.onclick = () => {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button")
    todoText.textContent = todoInput.value;
    todoInput.value = "";
    todoItem.appendChild(todoText);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    todoInput.oninput = () => {
        // 入力欄が空の時はボタンを押せないようにする
        addButton.disabled = todoInput.value === "";
      };
    deleteButton.textContent ="削除";
    editButton.textContent = "編集";
    editButton.onclick = () => {
        todoText.textContent = prompt("新しい内容を入力してください")
    };
    deleteButton.onclick = () => {
        todoList.removeChild(todoItem);
    };

    
  };