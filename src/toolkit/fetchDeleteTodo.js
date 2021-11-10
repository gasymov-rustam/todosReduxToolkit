import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTodo } from "../api/todos";


export const fetchDeleteTodo = createAsyncThunk("todosData/fetchDeleteTodo", async (id) => {
  const [, deletedTodoDataError] = await deleteTodo(id);
  if (!deletedTodoDataError) return id;
  else return deletedTodoDataError.message;
});