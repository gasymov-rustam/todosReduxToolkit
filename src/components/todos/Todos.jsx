import cn from "./Todos.module.css";
import Todo from "../todo/Todo";
import { useEffect } from "react";
import { fetchGetTodos, todosState } from "../../toolkit/todosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Todos({ status }) {
  const dispatch = useDispatch();
  const todosData = useSelector(todosState);
  status = +status;
  useEffect(() => {
    dispatch(fetchGetTodos());
  }, [dispatch]);

  return (
    <>
      {todosData.todos.filter((todo) => todo.status === status).length > 0 && (
        <div className={cn.wrapper}>
          <h2 className={cn.partName}>
            {status === 0 ? "New Tasks" : status === 1 ? "Tasks in Progress" : "Completed Tasks"}
          </h2>
          {todosData.todos
            .filter((todo) => todo.status === status)
            .sort((a, b) => a.title.localeCompare(b.title) || b.createdAt - a.createdAt)
            .map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
        </div>
      )}
    </>
  );
}
