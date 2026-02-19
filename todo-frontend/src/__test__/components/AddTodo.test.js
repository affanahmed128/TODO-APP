import React from "react"

import {render, fireEvent, screen, cleanup} from "@testing-library/react"
import AddTodo from "../../components/AddTodo"

afterEach(()=>{
    cleanup();
    jest.resetAllMocks();
})

describe("Testing the Add Todo component", ()=>{
    test("Render the input field and add button", ()=>{
        render(<AddTodo onAdd={() =>{}}/>)
        expect(screen.getByPlaceholderText("Add a new Todo")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Add Todo"})).toBeInTheDocument();
    })

    test("When form is submitted, the onAdd function to be invoked", () =>{
        const mockOnAdd = jest.fn();
        render(<AddTodo onAdd={mockOnAdd}/>)

        const input = screen.getByPlaceholderText("Add a new Todo");
        const button = screen.getByRole("button", {name: "Add Todo"});

        fireEvent.change(input,{ target: {value: "New Todo"}});
        fireEvent.click(button);

        expect(mockOnAdd).toHaveBeenCalledWith("New Todo");
    })

    test("Input gets cleared after submission", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodo onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a new Todo");
    const button = screen.getByRole("button", { name: "Add Todo" });

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    expect(input.value).toBe(""); // input should be cleared after submit
    })


    //  TODO write a test to check that the input gets cleared after submission

    test("Input should be cleared after submission", () => {
    const mockOnAdd = jest.fn();
    render(<AddTodo onAdd={mockOnAdd} />);

    const input = screen.getByPlaceholderText("Add a new Todo");
    const button = screen.getByRole("button", { name: "Add Todo" });

    // Type into input
    fireEvent.change(input, { target: { value: "New Todo" } });

    // Submit form
    fireEvent.click(button);

    // Check if input is cleared
    expect(input.value).toBe("");
});

})