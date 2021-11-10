import cn from "./Todo.module.css";
import { fetchDeleteTodo } from "../../toolkit/fetchDeleteTodo";
import { fetchUpdateTodo } from "../../toolkit/fetchUpdateTodo";
import { useDispatch } from "react-redux";

export default function Todo({ todo }) {
  const dispatch = useDispatch();
  function setNextStatus() {
    dispatch(fetchUpdateTodo(todo));
  }
  function deleteFromTodo() {
    dispatch(fetchDeleteTodo(todo.id));
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
