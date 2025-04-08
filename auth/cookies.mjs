import cookieParser from 'cookie-parser';
import { response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

export default function applyCookieSession(app) {
    app.use(cookieParser('express_todo_list_cookies'));

    app.use(
        session({
            secret: 'express_todo_list',
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60000 * 60 * 24,
            },
            store: MongoStore.create({
                client: mongoose.connection.getClient(),
            })
        })
    );
}


export function isAuthenticated(session) {
    if (!session || !session.user) 
        return response.status(401).send("Not authenticated");
}