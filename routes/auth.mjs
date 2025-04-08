import { Router } from "express";
import passport from '../auth/passport.mjs';

const router = Router();

// router.post('/api/auth', async (request, response) => {
//     const { body: { name, password }, } = request;
//     const user = await User.findOne({name});

//     if (!user || user.password !== password) return response.status(401).send({ msg: "BAD CREDENTIALS" });

//     request.session.user = user;
//     return response.status(200).send(user);
// });

// router.get('/api/auth/status', (request, response) => {
//     request.sessionStore.get(request.sessionID, (err, session) => {
//         console.log(session);
//     });
//     return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ msg: "Not Authenticated"})
// });

router.post('/api/auth/login', passport.authenticate('local'), (request, response) => {
    response.sendStatus(200);
});

router.get('/api/auth/status', (request, response) => {
    return request.user ? response.status(200).send(request.user) : response.status(401).send({ message: "User not authenticated" });
});

router.post('/api/auth/logout', (request, response) => {
    if (!request.user) return response.sendStatus(401);
    request.logout((err) => {
        if (err) return response.sendStatus(400);
        response.sendStatus(200);
    });
});

export default router;