

import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import cors from "cors"
import express from "express"
import aiRotuter from './routes/aiRouter.js' 
import connect from "./utils/connection.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect()
app.use('/api/ai', aiRotuter)

app.listen(3000, () => {
    console.log("Server is running on the port 3000");

})


export default app

