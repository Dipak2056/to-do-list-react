import "./App.css";
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          className="firstInput"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className="addtodo" type="submit">
          Add Todo
        </button>
      </form>
      {todos.map((todo) => (
        <div className="element" key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              placeholder="write new task here.."
              className="input"
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div className="todoElm">{todo.text}</div>
          )}

          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />
          <button className="deleteButton" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
          {todoEditing === todo.id ? (
            <button className="submitButton" onClick={() => editTodo(todo.id)}>
              Submit
            </button>
          ) : (
            <button
              className="editButton"
              onClick={() => setTodoEditing(todo.id)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
