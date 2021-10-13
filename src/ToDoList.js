import React, { Component } from 'react'
import { createTodo, getTodos, updateTodo } from './api-utils.js'
import { clearCompleted } from './utils.js';

export default class ToDoList extends Component {
    state = {
        todos: [],
        newToDo: ''
    }

    componentDidMount = async() => {
        const todos = await getTodos(this.props.token);
        this.setState({ todos })
        // console.log(this.state.todos)
    }

    setToDo = (e) => this.setState({ newToDo: e.target.value })

    handleSubmit = async e => {
        !this.state.newToDo ? alert('Please enter a task!') :
        
        e.preventDefault();
        const token = this.props.token;
        // console.log(token);
        await createTodo(this.state.newToDo, token);
        // console.log(addedToDo);

        const todos = await getTodos(this.props.token);
        this.setState({ todos, newToDo: '' })

    }

    handleClear = async() => {
        const todos = await getTodos(this.props.token);
        // await todos.forEach(todo => todo.completed === 'true' && deleteTodo(todo.id, this.props.token))
        await clearCompleted(todos, this.props.token);
        const cleanList = await getTodos(this.props.token);
        await this.setState({ todos: cleanList })
    }

    render() {
        const allToDos = this.state.todos

        return (
            <div className="todo-container">
                <form className="addtodo-form" onSubmit={this.handleSubmit}>
                <label>What do you need to do?
                    <input value={this.state.newToDo} onChange={this.setToDo} />
                </label>
                <button>Add</button>
                </form>

                <div className="todo-list">
                    {allToDos
                        .map(entry =>
                            <div 
                            onClick={ async () => {
                                await updateTodo(entry.id, 'true', this.props.token)
                                const updatedToDos = await getTodos(this.props.token)
                                this.setState({ todos: updatedToDos })
                                // console.log(this.state.todos)
                            }}
                            className={entry.completed === 'true' ? 'completed' : 'incomplete'}
                            key={entry.id}
                            value={entry.id}
                            > {entry.todo} </div>
                        )}
                </div>
                <button onClick={this.handleClear}>Clear Completed</button>
            </div>
        )
    }
}
