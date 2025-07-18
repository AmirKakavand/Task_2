'use client';

import { useState } from 'react';
import { useTodo } from '../../context/todo-context';

type RawImportedTodo = {
  title: unknown;
  completed: unknown;
};

const isValidImportedTodo = (item: unknown): item is RawImportedTodo => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'completed' in item &&
    typeof (item as Record<string, unknown>).title === 'string' &&
    (item as Record<string, unknown>).completed === false
  );
};



export default function ManagePage() {
  const { state, dispatch } = useTodo();
  const [importValue, setImportValue] = useState('');
  const [importError, setImportError] = useState('');

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };

  const handleExport = () => {
    const incomplete = state.todos.filter((todo) => !todo.completed);
    const blob = new Blob([JSON.stringify(incomplete, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'incomplete_tasks.json';
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  type ImportedTodo = {
  title: string;
  completed: false;
};

const handleImport = () => {
  try {
    const parsed: unknown = JSON.parse(importValue);

    if (!Array.isArray(parsed) || !parsed.every(isValidImportedTodo)) {
      throw new Error();
    }

    // Now TypeScript knows this is ImportedTodo[]
    const tasks = (parsed as ImportedTodo[]).map((t) => ({
      id: crypto.randomUUID(),
      title: t.title,
      completed: false,
    }));

    dispatch({ type: 'IMPORT_JSON', todos: tasks });
    setImportValue('');
    setImportError('');
  } catch {
    setImportError('Invalid JSON. Make sure it contains only incomplete tasks.');
  }
};



  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Tasks</h1>

      <ul className="w-full max-w-md space-y-2 mb-6">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center px-4 py-2 rounded shadow ${
              todo.completed ? 'bg-gray-600' : 'bg-gray-300 text-gray-800'
            }`}
          >
            <span className={`break-words w-10/12 ${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </span>
            <button
              onClick={() => handleToggle(todo.id)}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              {todo.completed ? 'Undo' : 'Done'}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleExport}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-purple-700"
        >
          Export Incomplete as JSON
        </button>
      </div>

      <div className="w-full max-w-md">
        <textarea
          value={importValue}
          onChange={(e) => setImportValue(e.target.value)}
          placeholder='Paste JSON of incomplete tasks here...'
          className="w-full border border-gray-300 rounded p-2 h-40 mb-2"
        />

        {importError && (
          <p className="text-red-500 mb-2 font-medium">{importError}</p>
        )}

        <button
          onClick={handleImport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Import JSON
        </button>
      </div>
    </div>
  );
}
