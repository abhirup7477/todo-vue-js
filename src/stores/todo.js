import { ref, computed } from 'vue'
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
    actions:{
        saveToStorage(){
            localStorage.setItem("todos", JSON.stringify(this.todos))
        },
        addTask(title, description){
            const exists = this.todos.find(t => t.title === title)
            if(exists){
                alert("Task already exists in the list!")
                return
            }
            const id = this.todos.length? this.todos[this.todos.length - 1].id + 1 : 1
            this.todos.push({
                id: id,
                title: title,
                description: description,
                completed: false,
            })
            this.saveToStorage()
        },
        removeById(id){
            const index = this.todos.findIndex(t => t.id === id)
            if(index != -1){
                this.todos.splice(index, 1)
                this.saveToStorage()
            }
        },
        removeAll(){
            this.todos = []
            this.saveToStorage()
            console.log(this.todos)
            console.log(JSON.parse(localStorage.getItem("todos")));
        },
    }
})
