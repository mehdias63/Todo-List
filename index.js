const todos = []

const taskInputForm = document.querySelector('.todo-input')
const todoFormHandler = document.querySelector('.todo-form')
const todoList = document.querySelector('.todo-list')
const selectFilter = document.querySelector('.filter-todos')

todoFormHandler.addEventListener('submit', addNewTodo)
selectFilter.addEventListener('change', filterTodos)
function addNewTodo(e) {
	e.preventDefault()
	if (!taskInputForm.value) return null
	const newTodo = {
		id: Date.now(),
		createdAt: new Date().toISOString(),
		title: taskInputForm.value,
		isCompleted: false,
	}
	todos.push(newTodo)
	createTodos(todos)
}
function createTodos(todos) {
	let result = ''
	todos.forEach(todo => {
		result += `<li class="todo">
<p class="todo__title">${todo.title}</p>
<span class="todo__createdAt">${new Date(
			todo.createdAt,
		).toLocaleDateString('fa-IR')}</span>
<button class="todo__check far" data-todo-id=${
			todo.id
		}><i class="fa-check-square"></i></button>
<button class="todo__check far" data-todo-id=${
			todo.id
		}><i class="far fa-trash-alt"></i></button></li>`
	})
	todoList.innerHTML = result
	taskInputForm.value = ''
	const removeBtns = [...document.querySelector('.todo__remove')]
	removeBtns.forEach(btn)=>btn.addEventListener("click",removeTodo)
}
function filterTodos(e) {
	const filter = e.target.value
	switch (filter) {
		case 'all': {
			createTodos(todos)
			break
		}
		case 'completed': {
			const filteredTodos = todos.filter(t => t.isCompleted)
			createTodos(filteredTodos)
			break
		}
		case 'uncompleted': {
			const filteredTodos = todos.filter(t => !t.isCompleted)
			createTodos(filteredTodos)
			break
		}
		default:
			createTodos(todos)
	}
}
function removeTodo(e) {
	
}
