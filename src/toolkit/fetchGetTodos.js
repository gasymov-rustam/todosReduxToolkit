import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos } from "../api/todos";


export const fetchGetTodos = createAsyncThunk("todosData/fetchGetTodos", async () => {
  const [getTodosData, getTodosDataError] = await getTodos();
  if (!getTodosDataError) return getTodosData;
  else return getTodosDataError.message;
});