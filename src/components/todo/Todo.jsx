import cn from "./Todo.module.css";
import { useTodos } from "../../hooks/useTodos";
import { updateTodo, deleteTodo } from "../../api/todos";
export default function Todo({ todo }) {
  const [, dispatch] = useTodos();
  async function setNextStatus() {
    const [updatedTodo, updatedTodoError] = await updateTodo(todo.id, {
      status: todo.status + 1,
      updatedAt: Date.now(),
    });
    if (!updatedTodoError) dispatch({ type: "NEXT_STATUS", payload: updatedTodo });
  }
  async function deleteFromTodo() {
    const [, deletedTodoError] = await deleteTodo(todo.id);
    if (!deletedTodoError) dispatch({ type: "DELETE", payload: todo.id });
  }
  return (
    <div className={cn.wrapper}>
      <h2 className={cn.title}>{todo.title}</h2>
      <h3 className={cn.body}>{todo.body}</h3>
      <h4 className={cn.time}>created: {new Date(todo.createdAt).toLocaleString()}</h4>
      {todo.updatedAt ? (
        <h4 className={cn.time}>updated: {new Date(todo.updatedAt).toLocaleString()}</h4>
      ) : (
        <h4 className={cn.time}></h4>
      )}
      {
        <button className={cn.btn} onClick={todo.status < 2 ? setNextStatus : deleteFromTodo}>
          {todo.status === 0 ? "in Work" : todo.status === 1 ? "in Done" : "Delete"}
        </button>
      }
    </div>
  );
}
