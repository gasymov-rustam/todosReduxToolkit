import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTodo } from "../api/todos";

export const fetchUpdateTodo = createAsyncThunk("todosData/fetchUpdateTodo", async (todo) => {
  const { id, status } = todo;
  const [updatedTodoData, updatedTodoDataError] = await updateTodo(id, {
    status: status + 1,
    updatedAt: Date.now(),
  });
  if (!updatedTodoDataError) return updatedTodoData;
  else return updatedTodoDataError.message;
});
