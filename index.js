let filterValue = 'all'

const taskInputForm = document.querySelector('.todo-input')
const todoFormHandler = document.querySelector('.todo-form')
const todoList = document.querySelector('.todo-list')
const selectFilter = document.querySelector('.filter-todos')

todoFormHandler.addEventListener('submit', addNewTodo)
selectFilter.addEventListener('change', e => {
	filterValue = e.target.value
	filterTodos()
})
document.addEventListener('DOMContentLoaded', e => {
	const todos = getAllTodos()
	createTodos(todos)
})
document.addEventListener('DOMContentLoaded', () => {
	const editPopup = document.querySelector('.edit-popup')
	editPopup.classList.add('hidden')
})

function addNewTodo(e) {
	e.preventDefault()
	if (!taskInputForm.value) return null
	const newTodo = {
		id: Date.now(),
		createdAt: new Date().toISOString(),
		title: taskInputForm.value,
		isCompleted: false,
	}
	saveTodo(newTodo)
	filterTodos()
}
function createTodos(todos) {
	let result = ''
	todos.forEach(todo => {
		result += `<li class="todo">
            <p class="todo__title ${
							todo.isCompleted && 'completed'
						}">${todo.title}</p>
            <span class="todo__createdAt">${new Date(
							todo.createdAt,
						).toLocaleDateString('fa-IR')}</span>
            <button class="todo__check" data-todo-id=${
							todo.id
						}><i class="far fa-check-square"></i></button>
            <button class="todo__remove" data-todo-id=${
							todo.id
						}><i class="far fa-trash-alt"></i></button>
            <button class="todo__edit" data-todo-id=${
							todo.id
						}><i class="fas fa-edit"></i></button>
        </li>`
	})

	todoList.innerHTML = result
	taskInputForm.value = ''

	const removeBtns = [...document.querySelectorAll('.todo__remove')]
	removeBtns.forEach(btn => btn.addEventListener('click', removeTodo))

	const checkBtns = [...document.querySelectorAll('.todo__check')]
	checkBtns.forEach(btn => btn.addEventListener('click', checkTodo))

	const editBtns = [...document.querySelectorAll('.todo__edit')]
	editBtns.forEach(btn => btn.addEventListener('click', editTodo))
}

function filterTodos() {
	const todos = getAllTodos()
	switch (filterValue) {
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
	let todos = getAllTodos()
	const todoId = Number(e.target.dataset.todoId)
	todos = todos.filter(t => t.id !== todoId)
	saveAllTodos(todos)
	filterTodos()
}
function checkTodo(e) {
	const todos = getAllTodos()
	const todoId = Number(e.target.dataset.todoId)
	const todo = todos.find(t => t.id === todoId)
	todo.isCompleted = !todo.isCompleted
	saveAllTodos(todos)
	filterTodos()
}
function editTodo(e) {
	const todos = getAllTodos()
	const todoId = Number(e.target.dataset.todoId)
	const todo = todos.find(t => t.id === todoId)

	if (!todo) return
	const editModal = document.querySelector('.edit-modal')
	const editInput = document.querySelector('.edit-input')
	editModal.classList.remove('hidden')
	editInput.value = todo.title
	const saveEditBtn = document.querySelector('.save-edit')
	saveEditBtn.onclick = () => {
		const newTitle = editInput.value.trim()
		if (!newTitle) {
			alert('Title cannot be empty!')
			return
		}
		todo.title = newTitle
		saveAllTodos(todos)
		editModal.classList.add('hidden')
		filterTodos()
	}
	const cancelEditBtn = document.querySelector('.cancel-edit')
	cancelEditBtn.onclick = () => {
		editModal.classList.add('hidden')
	}
}

function getAllTodos() {
	const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
	return savedTodos
}

function saveTodo(todo) {
	const savedTodos = getAllTodos()
	savedTodos.push(todo)
	localStorage.setItem('todos', JSON.stringify(savedTodos))
	return savedTodos
}

function saveAllTodos(todos) {
	localStorage.setItem('todos', JSON.stringify(todos))
}
