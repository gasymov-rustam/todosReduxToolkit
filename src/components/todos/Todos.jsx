import cn from "./Todos.module.css";
import Todo from "../todo/Todo";
import { useTodos } from "../../hooks/useTodos";
import { useEffect } from "react";
import { fetchGetTodos, todosState } from "../../toolkit/todosSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Todos({ status }) {
  // const [todos] = useTodos();
  const dispatch = useDispatch();
  const todosData = useSelector(todosState);
  useEffect(() => {
    dispatch(fetchGetTodos());
  }, []);
  status = +status;
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
