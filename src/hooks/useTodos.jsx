import { useEffect, useContext, useMemo, useReducer, createContext } from "react";
import { getTodos } from "../api/todos";

const initialState = [];
const TododsContext = createContext(initialState);
export const useTodos = () => useContext(TododsContext);
export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoValue = useMemo(() => [state, dispatch], [state]);
  useEffect(() => {
    (async function () {
      const [getTodo, getTodoError] = await getTodos();
      if (!getTodoError) dispatch({ type: "INIT", payload: getTodo });
    })();
  }, []);
  return <TododsContext.Provider value={memoValue}>{children}</TododsContext.Provider>;
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "INIT": {
      return payload;
    }
    case "ADD": {
      return [...state, payload];
    }
    case "NEXT_STATUS": {
      const newState = [...state];
      const todoIdx = newState.findIndex((todo) => todo.id === payload.id);
      newState.splice(todoIdx, 1, payload);
      return newState;
    }
    case "DELETE": {
      return [...state].filter((todo) => todo.id !== payload);
    }
    default:
      throw new Error(`Unknown type ===>>>> ${type}`);
  }
}
