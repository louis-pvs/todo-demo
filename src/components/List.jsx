import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/list.scss";
import Loading from "./Loading";
import Error from "./Error";
import ListItem from "./ListItem";

import * as actions from "../states/todo/actions";

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      message: PropTypes.string
    })
  ),
  removeTodo: PropTypes.func.isRequired,
  toggleTodoCompletion: PropTypes.func.isRequired,
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
      props.toggleTodoCompletion(todo.id);
    };
    const onClearClick = () => {
      props.removeTodo(todo.id);
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

function areEqual(prevProps, nextProps) {
  return (
    nextProps.isError === prevProps.isError &&
    nextProps.isLoading === prevProps.isLoading &&
    !nextProps.data.some(function areDiff(item, i) {
      return (
        // checking either one of them are different or modified
        prevProps.data[i] &&
        (prevProps.data[i].id !== item.id ||
          prevProps.data[i].modifiedTime !== item.modifiedTime ||
          prevProps.data[i].message !== item.message)
      );
    })
  );
}

export default React.memo(
  connect(
    ({ app, todo }) => ({
      isLoading: app.isLoading,
      isError: app.isError,
      data: todo
    }),
    {
      toggleTodoCompletion: actions.toggleTodoCompletion,
      removeTodo: actions.removeTodo
    }
  )(List),
  areEqual
);
