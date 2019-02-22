import React from "react";

import useTodoData from "../services/useTodoData";

import "../styles/list.scss";
import ListItem from "./ListItem";

function List() {
  const { removeTodo, todoList, updateTodoCompletion } = useTodoData();
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

  return <ul className="list">{todoList.map(renderListItem)}</ul>;
}

export default List;
