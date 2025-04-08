import { Router } from "express";
import { Todo } from "../schemas/todo.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { todoValidation, filterTodo } from '../schemas/validations/todoValidation.mjs'

const router = Router();

router.get('/api/todos', checkSchema(filterTodo), async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty()) 
        return response.status(400).send({ errors: result.array() });
      
    const { filter, value } = matchedData(request);

    const todos = await Todo.find();

    try {
        if (filter && value) {
            const query = {};
            query[filter] = { $regex: value, $options: 'i' };
            const filtered = await Todo.find(query);
            return response.send(filtered);
        }        
    } catch (error) {
        
    }

    response.send(todos);
});

router.post('/api/todos', checkSchema(todoValidation), async (request, response) => {
    const result = validationResult(request);

    if(!result.isEmpty())
        return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const newTodo = new Todo(data);

    try {
        const savedTodo = await newTodo.save();
        return response.status(201).send(savedTodo);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

router.get('/api/todos/:id', async (request, response) => {
    try {
        const todo = await Todo.findById(request.params.id); 

        if (!todo) return response.status(404).send({ message: 'To do not found' });

        response.send(todo);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to find to do' });
    }
});

router.put('/api/todos/:id', checkSchema(todoValidation), async (request, response) => {
    const result = validationResult(request);

    if(!result.isEmpty())
        return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, data, { new: true, runValidators: true });

        if (!updatedTodo) return response.status(404).send({ message: 'To do not found' });

        response.send(updatedTodo);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to update to do' });
    }

});

router.delete('/api/todos/:id', async (request, response) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(request.params.id);

        if (!deletedTodo) return response.status(404).send({ message: 'To do not found' });

        response.send(deletedTodo);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to delete to do' });
    }
});

export default router;