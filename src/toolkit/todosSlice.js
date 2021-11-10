import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";

export const fetchGetTodos = createAsyncThunk("todosData/fetchGetTodos", async () => {
  const [getTodosData, getTodosDataError] = await getTodos();
  if (!getTodosDataError) return getTodosData;
  else return getTodosDataError.message;
});

export const fetchAddTodo = createAsyncThunk("todosData/fetchAddTodo", async (newTodo) => {
  const [createTodoData, createTodoDataError] = await addTodo(newTodo);
  if (!createTodoDataError) return createTodoData;
  else return createTodoDataError.message;
});

export const fetchUpdateTodo = createAsyncThunk("todosData/fetchUpdateTodo", async (todo) => {
  const { id, status } = todo;
  const [updatedTodoData, updatedTodoDataError] = await updateTodo(id, {
    status: status + 1,
    updatedAt: Date.now(),
  });
  if (!updatedTodoDataError) return updatedTodoData;
  else return updatedTodoDataError.message;
});

export const fetchDeleteTodo = createAsyncThunk("todosData/fetchDeleteTodo", async (id) => {
  const [, deletedTodoDataError] = await deleteTodo(id);
  if (!deletedTodoDataError) return id;
  else return deletedTodoDataError.message;
});

const setLoading = (state) => {
  state.error = null;
  state.status = "loading";
};

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
        state.status = "rejected";
        state.error = action.payload;
      }
    },
    [fetchAddTodo.pending]: setLoading,
    [fetchAddTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        state.status = "resolved";
        state.todos.push(action.payload);
      } else {
        state.status = "rejected";
        state.error = action.payload;
      }
    },
    [fetchUpdateTodo.pending]: setLoading,
    [fetchUpdateTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.status = "resolved";
        state.todos.splice(todoIdx, 1, action.payload);
      } else {
        state.status = "rejected";
        state.error = action.payload;
      }
    },
    [fetchDeleteTodo.pending]: setLoading,
    [fetchDeleteTodo.fulfilled]: (state, action) => {
      if (typeof action.payload !== "string") {
        state.status = "resolved";
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      } else {
        state.status = "rejected";
        state.error = action.payload;
      }
    },
  },
});

export default todosSlice.reducer;
export const todosState = (state) => state.todosData;
