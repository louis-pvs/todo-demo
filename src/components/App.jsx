import React from "react";
import "../styles/index.scss";
import List from "./List";
import Input from "./Input";

import useTodoData from "../services/useTodoData";

export default function App() {
  const { addTodo, isError, isLoading } = useTodoData();

  return (
    <div className="app">
      <h1 className="app__headline">To-Do App!</h1>
      <h4 className="app__subheadline">Add New To-Do</h4>
      {isError ? (
        <p className="app__errorMessage">
          Something went wrong on our side, so sorry please try again.
        </p>
      ) : null}
      <Input onAddClick={addTodo} />
      <List />
      {isLoading ? <p className="app__loadingMessage">Loading...</p> : null}
    </div>
  );
}
