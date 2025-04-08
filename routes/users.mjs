import { Router } from "express";
import { User } from "../schemas/user.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { userValidation, filterUser } from '../schemas/validations/userValidation.mjs'

const router = Router();

router.get('/api/users', checkSchema(filterUser), async (request, response) => {
    const result = validationResult(request);

    if (!result.isEmpty()) 
        return response.status(400).send({ errors: result.array() });
      
    const { filter, value } = matchedData(request);

    const users = await User.find();

    try {
        if (filter && value) {
            const query = {};
            query[filter] = { $regex: value, $options: 'i' };
            const filtered = await User.find(query);
            return response.send(filtered);
        }        
    } catch (error) {
        
    }
    if (filter && value)
        return response.send(
            users.filter((user) => user[filter].includes(value))
        );

    response.send(users);
});

router.post('/api/users', checkSchema(userValidation), async (request, response) => {
    const result = validationResult(request);

    if(!result.isEmpty())
        return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const newUser = new User(data);

    try {
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

router.get('/api/users/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id); 

        if (!user) return response.status(404).send({ message: 'User not found' });

        response.send(user);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to find to do' });
    }
});

router.put('/api/users/:id', checkSchema(userValidation), async (request, response) => {
    const result = validationResult(request);

    if(!result.isEmpty())
        return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, data, { new: true, runValidators: true });

        if (!updatedUser) return response.status(404).send({ message: 'User not found' });

        response.send(updated);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to update to do' });
    }

});

router.delete('/api/users/:id', async (request, response) => {
    try {
        const deletedUser = await User.findByIdAndDelete(request.params.id);

        if (!deletedUser) return response.status(404).send({ message: 'User not found' });

        response.send(deletedUser);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Failed to delete user' });
    }
});

export default router;