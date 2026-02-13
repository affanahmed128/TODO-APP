const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
    console.log("mongodb connected (local)")
  } catch (error) {
    console.error("Mongo db connection failed", error)
  }
}
 

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
const Todo = require("./models/todoModel")


app.get('/get-todo', async(req,res) =>{
    console.log("Fetching the todos from DB")
    try{
       const todos=await Todo.find();
       console.log("fetched all the todos",todos)
       res.status(200).json(todos)
    }catch(error){
       console.log("Error while fetching the todos",error)
       res.status(500).json({message:"something wet wrong,please try later"})
    }
})

app.post('/add-todo', async(req,res) =>{
    const title = req.body;
    // console.log("Adding a new todo",req.body)
    console.log("Adding a new todo",title.todo)
    const newTodo=new Todo({
      title:title.todo 
    })
    console.log("Adding the todo to DB",newTodo)
    const savedTodo=await newTodo.save()
    console.log("Adding the todo to DB",savedTodo)


    res.status(200).json(savedTodo)
})

connectDB()
const PORT=3001;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`)

})