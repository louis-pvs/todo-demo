import React from "react";
import PropTypes from "prop-types";

ListItem.propTypes = {
  done: PropTypes.bool,
  message: PropTypes.string,
  onCheckboxClick: PropTypes.func,
  onClearClick: PropTypes.func
};

function ListItem({ done, message, onCheckboxClick, onClearClick }) {
  return (
    <li className="list__item">
      <label className="list__itemCheckboxContainer" data-done={done}>
        <input
          checked={done}
          className="list__itemCheckbox"
          onChange={onCheckboxClick}
          type="checkbox"
        />
        {message}
      </label>
      <button className="list__itemCancelBtn" onClick={onClearClick}>
        clear
      </button>
    </li>
  );
}

export default ListItem;
