import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo } from "../api/todos";

export const fetchAddTodo = createAsyncThunk("todosData/fetchAddTodo", async (newTodo) => {
  const [createTodoData, createTodoDataError] = await addTodo(newTodo);
  if (!createTodoDataError) return createTodoData;
  else return createTodoDataError.message;
});