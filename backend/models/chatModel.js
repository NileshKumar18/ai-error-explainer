import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    errorText: String,
    errorExplanation: String,
    createdAt: {
        type: Date,
        default: Date.now
    }


})
const Chat = mongoose.model("Chat", chatSchema)

export default Chat