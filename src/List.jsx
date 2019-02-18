import React from "react";
import PropTypes from "prop-types";

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string
    })
  )
};

function List(props) {
  if (!props.data) {
    return <p>List is empty</p>;
  }
  return (
    <ul>
      {props.data.map(({ id, message }) => (
        <li key={id}>{message}</li>
      ))}
    </ul>
  );
}

export default List;
