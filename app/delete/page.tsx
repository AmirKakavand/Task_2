"use client";

import { useState } from "react";
import { useTodo } from "../../context/todo-context";

export default function DeletePage() {
  const { state, dispatch } = useTodo();
  const [message, setMessage] = useState("");

  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_TODO", id });
    setMessage("Task deleted successfully! ✅");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Tasks</h1>

      {state.todos.length === 0 ? (
        <p className="text-gray-500">No tasks to delete.</p>
      ) : (
        <ul className="w-full max-w-sm space-y-2">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center ${
                todo.completed ? "bg-gray-500" : "bg-gray-300"
              } font-bold text-gray-800 px-4 py-2 rounded shadow`}
            >
              <span
                className={`break-words w-10/12 pr-4 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {message && <p className="text-green-600 mt-4 font-medium">{message}</p>}
    </div>
  );
}
