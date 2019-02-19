import React from "react";
import PropTypes from "prop-types";

import "../styles/list.scss";
import ListItem from "./ListItem";

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      message: PropTypes.string
    })
  ),
  onCheckboxClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

function List(props) {
  if (!props.data.length) {
    return (
      <p className="list__emptyMessage">
        Horayyy! You have no task at the moment.
      </p>
    );
  }

  function renderListItem(todo) {
    const onCheckboxClick = () => {
      props.onCheckboxClick(todo.id);
    };
    const onClearClick = () => {
      props.onDeleteClick(todo.id);
    };
    return (
      <ListItem
        done={todo.done}
        key={todo.id}
        message={todo.message}
        onCheckboxClick={onCheckboxClick}
        onClearClick={onClearClick}
      />
    );
  }

  return <ul className="list">{props.data.map(renderListItem)}</ul>;
}

export default List;
