import React, { useState } from "react";

import "./index.scss";
import List from "./List";
import Input from "./Input";

export default function App() {
  const INITIAL_STATE = [{ id: 1, message: "Example Task" }];
  const [todoList, addTask] = useState(INITIAL_STATE);

  const onAddClick = message => {
    const newId = todoList.length + 1;
    const newTodoList = todoList.concat([{ id: newId, message }]);
    addTask(newTodoList);
  };

  return (
    <div className="app">
      <h1 className="app__headline">To-Do App!</h1>
      <h4 className="app__subheadline">Add New To-Do</h4>
      <Input onAddClick={onAddClick} />
      <List data={todoList} />
    </div>
  );
}
