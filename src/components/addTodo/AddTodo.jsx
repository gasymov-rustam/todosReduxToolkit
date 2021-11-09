import styles from "./AddTodo.module.css";
import { useTodos } from "../../hooks/useTodos";
import { addTodo } from "../../api/todos";
import { useState } from "react";

export default function AddTodo() {
  const [, dispatch] = useTodos();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  async function createNewTodo(e) {
    e.preventDefault();
    const newTodo = { title, body, status: 0, createdAt: Date.now(), updatedAt: null };
    setOpen(false);
    const [createdTodo, createdTodoError] = await addTodo(newTodo);
    if (!createdTodoError) {
      dispatch({ type: "ADD", payload: createdTodo });
      setTitle("");
      setBody("");
    }
  }

  function changeVisibleForm() {
    setTitle("");
    setBody("");
    setOpen(false);
  }

  return (
    <>
      <div className={styles.wrapperBtn}>
        <button className={styles.btn} onClick={() => setOpen(true)}>
          Add Task
        </button>
      </div>
      {open && (
        <div onClick={changeVisibleForm} className={styles.containerForm}>
          <form
            onSubmit={createNewTodo}
            onClick={(e) => e.stopPropagation()}
            className={styles.wrapper}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              className={styles.title}
              placeholder="Please enter title Todo"
              required
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              name="body"
              placeholder="text of Todo"
              className={styles.body}
            ></textarea>
            <button type="submit" className={styles.btnForm}>
              Add todo
            </button>
          </form>
        </div>
      )}
    </>
  );
}
