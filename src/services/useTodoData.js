import { useState, useEffect } from "react";
// to be move to services

import { getTodoList, storeTodoList } from "../services/localStorage";
import { firestore } from "firebase";

let cacheList = [];
export default function useTodoData() {
  const [todoList, updateTodoList] = useState(INITIAL_STATE());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const db = firestore();
  const listRef = db.collection("todo");

  useEffect(() => {
    startFetching();
    fetchData()
      .then(updateListWithCache)
      .then(() => setIsLoading(false))
      .catch(handleError);
  }, []);

  /**
   * @todo testing individual function
   **/

  function INITIAL_STATE() {
    return getTodoList() || [];
  }

  function fetchData() {
    return new Promise(function _fetchData(resolve, reject) {
      listRef
        .orderBy("createdTime")
        .get()
        .then(getListFromSnapshot)
        .then(resolve)
        .catch(err => reject(err));
    });
  }

  function getListFromSnapshot(snapshot) {
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  function addTodo(message) {
    startFetching();
    const newTodoRef = listRef.doc(); // getting the new document id from firestore
    const newData = {
      done: false,
      message,
      createdTime: firestore.Timestamp.fromDate(new Date()),
      modifiedTime: firestore.Timestamp.fromDate(new Date())
    };
    updateListWithCache(todoList.concat([{ id: newTodoRef.id, ...newData }]));
    newTodoRef
      .set(newData) // create new document in firestore collection
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function updateTodoCompletion(id, done) {
    startFetching();
    const newData = {
      done,
      modifiedTime: firestore.FieldValue.serverTimestamp()
    };
    updateListWithCache(
      todoList.map(i => (i.id === id ? { ...i, ...newData } : i))
    );
    listRef
      .doc(id)
      .update(newData)
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function removeTodo(id) {
    startFetching();
    updateListWithCache(todoList.filter(i => i.id !== id));
    listRef
      .doc(id)
      .delete()
      .then(() => setIsLoading(false))
      .catch(handleError);
  }
  function handleError() {
    undoChanges();
    setIsError(true);
    setIsLoading(false);
  }
  function startFetching() {
    cacheList = [...todoList];
    setIsError(false);
    setIsLoading(true);
  }
  function updateListWithCache(list) {
    storeTodoList(list);
    updateTodoList(list);
  }
  function undoChanges() {
    updateListWithCache(cacheList || []);
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
