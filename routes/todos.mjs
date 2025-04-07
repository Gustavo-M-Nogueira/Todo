import { Router } from "express";
import { Todo } from "../schemas/todo.mjs";

const router = Router();

router.get('/api/todos', async (request, response) => {
    const todos = await Todo.find(); 

    response.send(todos);
});

router.post('/api/todos', async (request, response) => {
    const { body } = request;

    const newTodo = new Todo(body);

    try {
        const savedTodo = await newTodo.save();
        return response.status(201).send(savedTodo);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

router.get('/api/todos/:id', async (request, response) => {
    const todo = await Todo.findById(request.params.id); 

    response.send(todo);
});

router.put('/api/todos/:id', async (request, response) => {
    const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });

    response.send(updatedTodo);
});

router.delete('/api/todos/:id', async (request, response) => {
    const deletedTodo = await Todo.findByIdAndDelete(request.params.id);

    response.send(deletedTodo);
});

export default router;