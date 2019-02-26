import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "../styles/list.scss";
import Loading from "./Loading";
import Error from "./Error";
import ListItem from "./ListItem";

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      message: PropTypes.string
    })
  ),
  onCheckboxClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};

function List(props) {
  if (!props.data || !props.data.length) {
    return (
      <p className="list__emptyMessage">
        Horayyy! You have no task at the moment.
      </p>
    );
  }

  function renderListItem(todo) {
    const onCheckboxClick = () => {
      props.onCheckboxClick(todo.id, !todo.done);
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

  return (
    <Fragment>
      {props.isError ? <Error /> : null}
      <ul className="list">{props.data.map(renderListItem)}</ul>
      {props.isLoading ? <Loading /> : null}
    </Fragment>
  );
}

export default List;
