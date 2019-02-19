import React from "react";
import PropTypes from "prop-types";

ListItem.propTypes = {
  message: PropTypes.string
};

function ListItem({ message }) {
  return (
    <li className="list__item">
      <label className="list__itemCheckboxContainer">
        <input type="checkbox" className="list__itemCheckbox" />
        {message}
      </label>
      <button className="list__itemCancelBtn">clear</button>
    </li>
  );
}

export default ListItem;
