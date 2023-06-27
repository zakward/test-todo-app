import { useState } from "react";
import axios from "axios";

function App() {
  //state for getting all todos
  const [initTodos, setInitTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  //boolean to toggle the add todo form
  const [formToggle, setFormToggle] = useState(false);

  //state for user inputs
  const [initInputs, setInitInputs] = useState({
    title: "",
    description: "",
  });
  const [inputs, setInputs] = useState(initInputs);

  // variable for rendering all todos
  const todoList = todos.map((todo) => {
    return (
      <>
        <div key={todo._id} id="todo-card">
          <h2>Title: {todo.title}</h2>
          <h3>Description: {todo.description}</h3>
          {/* <h4>Completed: {todo.completed ? "yes" : "no"}</h4> */}
          <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
            Delete
          </button>
        </div>
      </>
    );
  });

  // get request for all todos
  function getTodos() {
    axios
      .get("/api/todo")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }

  //clears all todos from the page
  function clearTodos() {
    setTodos(initTodos);
  }

  //handlechange function to update state of user inputs
  function handleInputsChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: value,
      };
    });
  }

  //post request to add a new todo
  function addTodo() {
    axios
      .post(`/api/todo/`, inputs)
      .then((res) =>
        setTodos((prevTodos) => {
          return [res.data, ...prevTodos];
        })
      )
      .catch((err) => console.log(err));
    setInputs(initInputs);
    setFormToggle(!formToggle);
  }

  //deleteing an individual todo from the db
  function deleteTodo(iD) {
    axios
      .delete(`/api/todo/${iD}`)
      .then((res) =>
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== iD))
      )
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div id="main-container">
        <h1 id="app-title">This is a test App using Vite </h1>
        <span id="button-span">
          <button onClick={getTodos}>Get All Todos</button>
          <button onClick={clearTodos}>Clear Todo List</button>
          <button onClick={() => setFormToggle(!formToggle)}>
            Make New Todo
          </button>
        </span>

        {formToggle && (
          <form id="addForm" onSubmit={addTodo}>
            <h1>Add Todo Form</h1>
            <input
              placeholder="add title"
              name="title"
              value={inputs.title}
              onChange={handleInputsChange}
            />
            <input
              placeholder="add description"
              name="description"
              value={inputs.description}
              onChange={handleInputsChange}
            />
            {/* <input
            placeholder="completed"
            name="completed"
            value={inputs.completed}
            onChange={handleInputsChange}
          /> */}
            <button>SUBMIT</button>
          </form>
        )}
      </div>
      <div id="todos-container">
        <h1>Todos from the API</h1>
        {todoList}
      </div>
    </>
  );
}

export default App;
