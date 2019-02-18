import React, { useState } from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  onAddClick: PropTypes.func
};

function Input({ onAddClick }) {
  const INITIAL_VALUE = "";
  const [inputValue, updateInput] = useState(INITIAL_VALUE);
  const onSubmit = e => {
    e.preventDefault(); // prevent page reloading everytime click submit
    onAddClick(inputValue);
    updateInput(INITIAL_VALUE);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={e => updateInput(e.target.value)}
        placeholder="Enter new task"
        value={inputValue}
      />
      <button disabled={!inputValue} type="submit" onClick={onSubmit}>
        Add
      </button>
    </form>
  );
}

export default Input;
