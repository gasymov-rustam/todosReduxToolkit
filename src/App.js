import "./App.css";
import Todos from "./components/todos/Todos";
import AddTodo from "./components/addTodo/AddTodo";
import { useSelector } from "react-redux";
import { todosState } from "./toolkit/todosSlice";
function App() {
  const todosData = useSelector(todosState);
  return (
    <>
      <div className="container">
        <h1 className="title">Task Manager</h1>
        {todosData.error ? (
          <h2 className="content-insription">Error: {todosData.error}</h2>
        ) : (
          todosData.todos.length === 0 && (
            <h2 className="content-insription">You don`t have any tasks right now!</h2>
          )
        )}
        <div className="general-wrapper">
          <Todos status="0" />
          <Todos status="1" />
          <Todos status="2" />
        </div>
        <AddTodo />
      </div>
    </>
  );
}

export default App;
