import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    wins: {
        type: Number,
        required: true,
    },
    losses: {
        type: Number,
        required: false,
    }
})

export default mongoose.model('Player', playerSchema);