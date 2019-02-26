import React, { Fragment } from "react";

import useTodoData from "../services/useTodoData";

import "../styles/list.scss";
import Loading from "./Loading";
import Error from "./Error";
import ListItem from "./ListItem";

function List() {
  const {
    isError,
    isLoading,
    removeTodo,
    todoList,
    updateTodoCompletion
  } = useTodoData();
  if (!todoList || !todoList.length) {
    return (
      <p className="list__emptyMessage">
        Horayyy! You have no task at the moment.
      </p>
    );
  }

  function renderListItem(todo) {
    const onCheckboxClick = () => {
      updateTodoCompletion(todo.id, !todo.done);
    };
    const onClearClick = () => {
      removeTodo(todo.id);
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
      {isError ? <Error /> : null}
      <ul className="list">{todoList.map(renderListItem)}</ul>
      {isLoading ? <Loading /> : null}
    </Fragment>
  );
}

export default List;
