const mongoose = require("mongoose")
const logger = require("./utils/logger")
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    // await mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
    logger.info("mongodb connected (local)")
  } catch (error) {
    logger.error("Mongo db connection failed", error)
  }
}

module.exports = connectDB;