import { createSlice } from "@reduxjs/toolkit";
import { fetchGetTodos } from "./fetchGetTodos";
import { fetchAddTodo } from "./fetchAddTodo";
import { fetchUpdateTodo } from "./fetchUpdateTodo";
import { fetchDeleteTodo } from "./fetchDeleteTodo";
import { setLoading } from "./setLoader";
import { setError } from "./setError";

const todosSlice = createSlice({
  name: "todosData",
  initialState: {
    status: null,
    error: null,
    todos: [],
  },
  extraReducers: {
    [fetchGetTodos.pending]: setLoading,
    [fetchGetTodos.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        state.status = "resolved";
        state.todos = action.payload;
      } else {
        setError(state, action);
      }
    },
    [fetchAddTodo.pending]: setLoading,
    [fetchAddTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        state.status = "resolved";
        state.todos.push(action.payload);
      } else {
        setError(state, action);
      }
    },
    [fetchUpdateTodo.pending]: setLoading,
    [fetchUpdateTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.status = "resolved";
        state.todos.splice(todoIdx, 1, action.payload);
      } else {
        setError(state, action);
      }
    },
    [fetchDeleteTodo.pending]: setLoading,
    [fetchDeleteTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        state.status = "resolved";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      } else {
        setError(state, action);
      }
    },
  },
});

export default todosSlice.reducer;
export const todosState = (state) => state.todosData;
