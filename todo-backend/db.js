const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    // await mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
    console.log("mongodb connected (local)")
  } catch (error) {
    console.error("Mongo db connection failed", error)
  }
}

module.exports = connectDB;