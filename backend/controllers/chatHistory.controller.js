import Chats from "../models/chatModel.js"

export const getChatHistory = async (req, res) => {
    try {
        const chatHistory = await Chats.find().sort({ createdAt: -1 })

        return res.status(200)
            .json({
                data: chatHistory,
                success: true
            })


    } catch (error) {
        return res.status(401).json(
            {
                message: error,
                success: false
            }
        )
    }
}