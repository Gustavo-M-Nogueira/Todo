import express from 'express';
import routes  from './routes/index.mjs'
import applyCookieSession from './auth/cookies.mjs';
import dbConnection from './db/dbConnection.mjs';
import { applyPassport } from './auth/passport.mjs';

const app = express();

dbConnection();

applyCookieSession(app);
applyPassport(app);

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Running on port ${PORT}`)
})