import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1234",
  headers: { "Content-type": "application/json;charset=utf-8" },
});

api.interceptors.response.use(
  (response) => [response.data],
  (error) => [null, error]
);

export const getTodos = () => api.get(`/todos`);
export const addTodo = (newTodo) => api.post(`/todos`, newTodo);
export const updateTodo = (id, updatedTodo) => api.patch(`/todos/${id}`, updatedTodo);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
