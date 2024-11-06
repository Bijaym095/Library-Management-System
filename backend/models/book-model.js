import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    copies: {
        type: Number,
        required: true,
        default: 1,
    },
    availableCopies: {
        type: Number,
        required: true,
    },
    category: {
        type: [String], 
        required: true,
    }
})

export default mongoose.model("Book", bookSchema)