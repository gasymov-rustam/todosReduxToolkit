import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../api/todos";

export const fetchGetTodos = createAsyncThunk(
  "todosData/fetchGetTodos",
  async (_, { rejectWithValue }) => {
    const [getTodosData, getTodosDataError] = await getTodos();
    if (!getTodosDataError) return getTodosData;
    else return getTodosDataError.message;
  }
);

const todosSlice = createSlice({
  name: "todosData",
  initialState: {
    status: null,
    error: null,
    todos: [],
  },
  reducers: {
    getTodosArray(state, action) {
      state.todos = action.payload;
    },
  },
  extraReducers: {
    [fetchGetTodos.pending]: (state) => {
      state.error = null;
      state.status = "loading";
    },
    [fetchGetTodos.fulfilled]: (state, action) => {
      // console.log(action);
      // console.log(state);
      if (typeof action.payload !== 'string') {
        state.status = "resolved";
        state.todos = action.payload;
      } else {
        state.status = "rejected";
        state.error = action.payload;
      }
    },
    [fetchGetTodos.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const todosState = (state) => state.todosData;
export const { getTodosArray } = todosSlice.actions;
