import React, { useState } from "react";
import "../styles/input.scss";

import useTodoData from "../services/useTodoData";

const INITIAL_VALUE = "";

function Input() {
  const { addTodo } = useTodoData();
  const [inputValue, updateInput] = useState(INITIAL_VALUE);

  const onSubmit = e => {
    e.preventDefault(); // prevent page reloading everytime click submit
    addTodo(inputValue);
    updateInput(INITIAL_VALUE);
  };
  return (
    <form onSubmit={onSubmit}>
      <label className="input__label">
        <input
          className="input"
          onChange={e => updateInput(e.target.value)}
          placeholder="Enter new task"
          value={inputValue}
        />
      </label>
      <button
        className="input__submitBtn"
        disabled={!inputValue}
        type="submit"
        onClick={onSubmit}
      >
        Add
      </button>
    </form>
  );
}

export default Input;
