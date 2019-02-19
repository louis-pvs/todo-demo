import { useState, useEffect } from "react";
// to be move to services

import { getTodoList, storeTodoList } from "../services/localStorage";
import { firestore } from "firebase";

export default function useTodoData() {
  const [todoList, updateTodoList] = useState(INITIAL_STATE());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const db = firestore();
  const listRef = db.collection("todo");
  useEffect(() => {
    startFetching();
    fetchData
      .then(list => {
        storeTodoList(list);
        updateTodoList(list);
      })
      .then(() => setIsLoading(false))
      .catch(handleError);
  }, [todoList]);

  /**
   * @todo testing individual function
   **/
  function INITIAL_STATE() {
    return getTodoList() || [];
  }
  const fetchData = new Promise(function _fetchData(resolve, reject) {
    listRef
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
      .then(resolve)
      .catch(err => reject(err));
  });
  function addTodo(message) {
    startFetching();
    listRef
      .add({ done: false, message }) // create new document in firestore collection
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function updateTodoCompletion(id, done) {
    startFetching();
    listRef
      .doc(id)
      .update({ done })
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function removeTodo(id) {
    startFetching();
    listRef
      .doc(id)
      .delete()
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function handleError() {
    setIsError(true);
    setIsLoading(false);
  }
  function startFetching() {
    setIsError(false);
    setIsLoading(true);
  }

  return {
    addTodo,
    isError,
    isLoading,
    removeTodo,
    todoList,
    updateTodoCompletion
  };
}
