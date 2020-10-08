import React, { useEffect, useState } from "react";

import { useExample } from "../hooks";
export default () => {
  // const { example, setExample, exampleAsync, list } = useExample()

  const [todoText, setTodoText] = useState("");
  const {
    // todos,
    addTodo,
    deleteTodo,
    completeTodo,
    list,
    // example,
  } = useExample();

  useEffect(() => {
    completeTodo();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(todoText);

    setTodoText("");
  }

  function handleComplete(id) {
    completeTodo(id);
  }

  return (
    <div className="container">
      <h1 className="todoTitle">todos</h1>
      <div className="TodoList">
        <form className="form" onSubmit={handleSubmit}>
          <span className="arrow">&#8964;</span>

          <input
            className="input"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder=" What needs to be done?"
          />
          {/* <button className="add" onClick={(e) => addTodo(todoText)}>
            add
          </button> */}
        </form>
        <ul>
          {list.map((item) => {
            return (
              <li>
                <input
                  type="checkbox"
                  onClick={() => handleComplete(item.id)}
                ></input>
                <span className={item.completed === true ? "completed" : ""}>
                  {item.text}
                </span>
                {console.log(item)}
                <button className="delete" onClick={() => deleteTodo(item.id)}>
                  x
                </button>
                <hr></hr>
                <div className="todoStats">
                  <div></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
