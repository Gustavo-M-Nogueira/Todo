import express from 'express';
import mongoose from 'mongoose';
import routes  from './routes/index.mjs'

const app = express();

mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Running on port ${PORT}`)
})