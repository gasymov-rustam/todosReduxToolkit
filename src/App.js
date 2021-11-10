import "./App.css";
import Todos from "./components/todos/Todos";
import AddTodo from "./components/addTodo/AddTodo";
import { useSelector } from "react-redux";
import { todosState } from "./toolkit/todosSlice";
import Load from "./components/Load/Load";
function App() {
  const todosData = useSelector(todosState);
  const { status, error, todos } = todosData;
  return (
    <>
      {status === 'loading' && <Load/>}
      <div className="container">
        <h1 className="title">Task Manager</h1>
        {error ? (
          <h2 className="content-insription">Error: {error}</h2>
        ) : (
          todos.length === 0 && (
            <h2 className="content-insription">You don`t have any tasks right now!</h2>
          )
        )}
        {!error && (
          <>
            <div className="general-wrapper">
              <Todos status="0" />
              <Todos status="1" />
              <Todos status="2" />
            </div>
            <AddTodo />
          </>
        )}
      </div>
    </>
  );
}

export default App;
