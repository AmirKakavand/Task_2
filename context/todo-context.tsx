// context/todo-context.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'REMOVE_TODO'; id: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'IMPORT_JSON'; todos: Todo[] };

const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      if (state.todos.length >= 5) return state;
      return {
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            title: action.title,
            completed: false,
          },
        ],
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'IMPORT_JSON':
      return {
        todos: action.todos,
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used inside TodoProvider');
  }
  return context;
};
