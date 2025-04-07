import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
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