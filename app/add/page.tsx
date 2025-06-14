// app/add/page.tsx
"use client";

import { useTodo } from "@/context/todo-context";
import { useState } from "react";

export default function AddPage() {
  const { state, dispatch } = useTodo();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (title.trim() === "") {
      setError("Title cannot be empty.");
      return;
    }

    if (state.todos.length >= 5) {
      setError("You can only add up to 5 tasks.");
      return;
    }

    dispatch({ type: "ADD_TODO", title });
    setTitle("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Task</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        placeholder="Enter task title..."
        className="border border-gray-300 rounded px-4 py-2 mb-2 w-full max-w-sm"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Task
      </button>

      {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}

      <div className="mt-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-2">Current Tasks:</h2>
        <ul className="space-y-1">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-gray-100 px-3 py-1 rounded text-gray-800"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
