import mongoose from "mongoose"

const connect = async() => {
   await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err)
        })
}
export default connect