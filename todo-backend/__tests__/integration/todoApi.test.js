const request = require("supertest")
const {MongoMemoryServer} = require("mongodb-memory-server")
const mongoose = require("mongoose")

const app = require("../../server")
const Todo = require("../../models/todoModel")

describe("Todo API Integeration test", () =>{
        describe("GET /api/get-todo",()=>{
            it("should return all the todos", async () =>{
            await Todo.create({title: "Todo 1"})
            await Todo.create({title: "Todo 2"})

            const response = await request(app).get("/api/get-todos");
            console.log("Response from the /api/get-todos test", response.body)
            expect(response.status).toBe(200)
            expect(response.body.length).toBe(2)
            expect(response.body[0].title).toBe("Todo 1")
            expect(response.body[1].title).toBe("Todo 2")
            })
        })
  }
})