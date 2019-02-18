import React, { useState } from "react";

import "./index.scss";
import List from "./List";
import Input from "./Input";

export default function App() {
  const [todoList, addTask] = useState([{ id: 1, message: "hello" }]);

  const onAddClick = message => {
    const newId = todoList.length + 1;
    const newTodoList = todoList.concat([{ id: newId, message }]);
    addTask(newTodoList);
  };

  return (
    <div className="app">
      <h1>To-do App!</h1>
      <List data={todoList} />
      <Input onAddClick={onAddClick} />
    </div>
  );
}
