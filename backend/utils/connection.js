import mongoose from "mongoose"

const connect = async() => {
    console.log(process.env.MONGO_URI);
    
   await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err)
        })
}
export default connect