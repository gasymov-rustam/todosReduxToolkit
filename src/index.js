import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./resets.css";
import App from "./App";
import { TodosProvider } from "./hooks/useTodos";
import { Provider } from "react-redux";
import { store } from "./toolkit/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodosProvider>
        <App />
      </TodosProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
