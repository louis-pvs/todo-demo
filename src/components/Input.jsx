import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../states/todo/actions";
import "../styles/input.scss";

Input.propTypes = {
  addTodo: PropTypes.func.isRequired
};

function Input({ addTodo }) {
  const INITIAL_VALUE = "";
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

export default connect(
  null,
  { addTodo: actions.addTodo }
)(Input);
