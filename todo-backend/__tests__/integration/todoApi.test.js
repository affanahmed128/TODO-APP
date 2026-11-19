// Integration-tests todo API endpoints against an isolated in-memory MongoDB database.
const request = require("supertest")
const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

const app = require("../../server")
const Todo = require("../../models/todoModel")

describe("Todo API Integeration test", () =>{
    let monogoServer;

    beforeAll(async ()=>{
        monogoServer = await MongoMemoryServer.create();
        const mongoUri = monogoServer.getUri();
        console.log("Mongo server uri is", mongoUri)
        await mongoose.disconnect()
        await mongoose.connect(mongoUri)   
    })
    afterAll(async () =>{
        await mongoose.disconnect();
        if (monogoServer) {
        await monogoServer.stop();
        }
});
        describe("GET /api/get-todos",()=>{
            it("should return only active todos", async () =>{
                await Todo.create({title: "Todo 1"})
                await Todo.create({title: "Todo 2"})
                await Todo.create({title: "Completed todo", completed: true})

                const response = await request(app).get("/api/get-todos");
                console.log("Response from the /api/get-todos test", response.body)
                expect(response.status).toBe(200)
                expect(response.body.length).toBe(2)
                expect(response.body[0].title).toBe("Todo 1")
                expect(response.body[1].title).toBe("Todo 2")
            })
        })
        describe("POST /api/add-todo", ()=>{
            it("should create a new todo", async () =>{
                const response = await request(app).post("/api/add-todo").send({title: "New Todo"})

                expect(response.status).toBe(200);
                expect(response.body.title).toBe("New Todo");
                expect(response.body.completed).toBe(false);

                const todo = await Todo.findById(response.body._id)
                console.log("Response is ",todo);
                expect(todo).toBeTruthy();
                expect(todo.title).toBe("New Todo")
                expect(todo.completed).toBe(false)
            })
        })
        describe("DELETE /api/delete-todo/:id", () => {
            it("should mark the todo as completed without deleting it", async () => {
                const todo = await Todo.create({ title: "Complete me" })

                const response = await request(app).delete(`/api/delete-todo/${todo._id}`)

                expect(response.status).toBe(200)
                expect(response.body.message).toBe("Todo completed successfully")

                const savedTodo = await Todo.findById(todo._id)
                expect(savedTodo).toBeTruthy()
                expect(savedTodo.completed).toBe(true)
                expect(savedTodo.completedAt).toBeInstanceOf(Date)

                const listResponse = await request(app).get("/api/get-todos")
                expect(listResponse.body.some(item => item._id === todo.id)).toBe(false)
            })
        })
})