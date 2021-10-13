import request from 'superagent'

const URL = 'https://tranquil-shelf-14510.herokuapp.com/';

//sign up and login
export async function signUp(email, password) {
    const response = await request 
    .post(`${URL}auth/signup`)
    .send({email, password})
    return response.body;
}

export async function logIn(email, password) {
    const response = await request 
    .post(`${URL}auth/signin`)
    .send({email, password})
    return response.body;
}

//getting, creating, updating, deleting todos
export async function getTodos(token) {
    const response = await request
    .get(`${URL}api/todos`)
    .set('Authorization', token)
    return response.body;
}

export async function createTodo(task, token) {
    const response = await request
        .post(`${URL}api/todos`)
        .set('Authorization', token)
        .send({'todo': task});
    return response.body;
}

export async function updateTodo(id, update, token) {
    const response = await request
        .put(`${URL}api/todos/${id}`)
        .set('Authorization', token)
        .send({
            'id': id,
            'completed': update
            });
    return response.body;
}

export async function deleteTodo(id, token) {
    const response = await request
    .delete(`${URL}api/todos/${id}`)
    .set('Authorization', token)

    return response.body;
}