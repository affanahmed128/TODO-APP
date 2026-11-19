// Implements the API handlers for listing, creating, and deleting todos.
const Todo = require("../models/todoModel")
const logger= require("../utils/logger")


exports.getTodos = async(req,res) =>{
    console.log("Fetching the todos from DB")
    try{
       const todos=await Todo.find({ completed: false });
       logger.info(`fetched all the todos ${JSON.stringify(todos)} ${todos.length}`)
       res.status(200).json(todos)
    }catch(error){
       logger.error("Error while fetching the todos",error)
       res.status(500).json({message:"something wet wrong,please try later"})
    }
}

exports.addTodo=async(req,res) =>{
    try {
        const title = req.body.title;
        // logger.log("Adding a new todo",req.body)
        logger.info(`Adding a new todo ${title}`)
        const newTodo=new Todo({
          title:title
        })
        logger.info("Adding the todo to DB",newTodo)
        const savedTodo=await newTodo.save()
        logger.info("Adding the todo to DB",savedTodo)

        res.status(200).json(savedTodo)

    } catch (error){
       logger.error("Error while Adding the todos", error)
       res.status(500).json({message: "something went wrong, please try later"})
    }

}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`Completing todo with id ${id}`)
        const completed = await Todo.findByIdAndUpdate(
            id,
            { completed: true, completedAt: new Date() },
            { returnDocument: "after" }
        );
        if (!completed) {
            return res.status(404).json({ message: "Todo not found" });
        }
        logger.info(`Completed todo ${id}`);
        res.status(200).json({ message: "Todo completed successfully", id });
    } catch (error) {
        logger.error("Error while completing the todo", error)
        res.status(500).json({ message: "Something went wrong, please try later" })
    }
}