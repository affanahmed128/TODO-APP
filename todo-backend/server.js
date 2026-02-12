const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TodoApp")
    console.log("mongodb connected (local)")
  } catch (error) {
    console.error("Mongo db connection failed", error)
  }
}
 
module.exports = connectDB;

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
const Todo = require("./models/todoModel")


app.post('/add-todo', async(req,res) =>{
    const {title} = req.body;
    console.log("Adding a new todo",title)
    res.status(200).json({message:"Hello Im BATMAN , DO U BLEED!"})
})

connectDB()
const PORT=3001;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)

})