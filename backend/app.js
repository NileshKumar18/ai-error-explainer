

import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import cors from "cors"
import express from "express"
import aiRotuter from './routes/aiRouter.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [
        "https://ai-error-explainer.vercel.app",
                "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.get('/', (req, res) => {


    return res.send("hello world!")
})
app.use('/api/ai', aiRotuter)

app.listen(3000, () => {
    console.log("Server is running on the port 3000");

})


