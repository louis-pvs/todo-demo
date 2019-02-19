import React from "react";
import PropTypes from "prop-types";

import "./list.scss";
import ListItem from "./ListItem";

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
  function renderListItem(todo) {
    return <ListItem key={todo.id} message={todo.message} />;
  }

  return <ul className="list">{props.data.map(renderListItem)}</ul>;
}

export default List;
