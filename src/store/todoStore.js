import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
	state: () => {
        return {
            todos: JSON.parse(localStorage.getItem("todos")) || []
        }
    },
	getters:{
        getCount(){
            return this.todos.length
        }
    },
	actions: {
        getById(id) {
            return this.todos.find(t => String(t.id) === id)
        },
		saveToStorage(){
            localStorage.setItem("todos", JSON.stringify(this.todos))
        },
		toggleTodo(id) {
			const t = this.todos.find(t => t.id === id)
			if (t) {
				t.completed = !t.completed
			}
			this.saveToStorage()
		},
		addTask(title, description){
            const exists = this.todos.find(t => t.title === title)
            if(exists){
                alert("Task already exists in the list!")
                return false
            }
            const id = Date.now()
            this.todos.push({
                id: id,
                title: title,
                description: description,
                completed: false,
            })
            this.saveToStorage()
            return true
        },
		removeById(id){
            const index = this.todos.findIndex(t => t.id === id)
            if(index != -1){
                this.todos.splice(index, 1)
                this.saveToStorage()
            }
        },
        update(todo){
            const index = this.todos.findIndex(t => String(t.id) === String(todo.id))
            if (index != -1){
                this.todos[index] = {...todo}
            }
            this.saveToStorage()
        }
  	}
})