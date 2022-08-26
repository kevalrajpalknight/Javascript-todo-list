// Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event){
	event.preventDefault();
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	saveLocalTodos(todoInput.value);

	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class ="fas fa-check"></i>';
	completedButton.classList.add('completed-btn');

	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);
	todoDiv.appendChild(completedButton);

	todoInput.value = '';
}

function deleteCheck(event){
	const item = event.target;
	if(item.classList[0] === "trash-btn") {
		const todo = item.parentElement;

		todo.classList.add('fall');
		todo.addEventListener('transitionend', function (){
			todo.remove();
		});
		removeLocalTodos(todo);
	}

	if(item.classList[0] === "completed-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e) {
  const todos = todoList.children;
  Object.keys(todos).forEach(function(key) {
  	var todo = todos[key];
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}


function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));

}


function getTodos(){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){

		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');

		const newTodo = document.createElement('li');
		newTodo.innerText = todo
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);

		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class ="fas fa-check"></i>';
		completedButton.classList.add('completed-btn');

		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);

		todoList.appendChild(todoDiv);
		todoDiv.appendChild(completedButton);
	})

}


function removeLocalTodos(todo) {
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	let index;
	index = todos.indexOf(todo.innerText);
	todos.splice(index, 1);
	localStorage.setItem('todos',JSON.stringify(todos));
}
