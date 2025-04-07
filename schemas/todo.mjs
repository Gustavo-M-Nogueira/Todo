import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["Not started", "In process", "Done"],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
});

export const Todo = mongoose.model("Todo", TodoSchema);