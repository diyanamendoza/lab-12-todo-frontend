import { deleteTodo } from "./api-utils.js"

export async function clearCompleted(array, token) {
    for(let todo of array) {
        if(todo.completed === 'true') {
            await deleteTodo(todo.id, token)
        }
    }
}