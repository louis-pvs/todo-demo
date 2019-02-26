import { useState, useEffect } from "react";
// to be move to services

import { getTodoList, storeTodoList } from "../services/localStorage";

let cacheList = [];

function INITIAL_STATE() {
  return getTodoList() || [];
}
function getRegistedFirebase() {
  return import(/* webpackChunkName: "initializeFirebase" */ "../../utils/firebase").then(
    module => module.default()
  );
}
export default function useTodoData() {
  const [todoList, updateTodoList] = useState(INITIAL_STATE());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    startFetching();
    fetchApi()
      .then(updateListWithCache)
      .then(() => setIsLoading(false))
      .catch(handleError);
  }, []);

  /**
   * @todo testing individual function
   **/
  function fetchApi() {
    return getRegistedFirebase()
      .then(getCollection)
      .then(getData);
  }
  function getCollection(db) {
    return db.firestore().collection("todo");
  }
  function getData(collectionRef) {
    return new Promise(function _getData(resolve, reject) {
      collectionRef
        .orderBy("createdTime")
        .get()
        .then(getListFromSnapshot)
        .then(resolve)
        .catch(reject);
    });
  }
  function getListFromSnapshot(snapshot) {
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  const addTodo = message => {
    startFetching();
    getRegistedFirebase()
      .then(_addTodo)
      .then(() => setIsLoading(false))
      .catch(handleError);
    function _addTodo({ firebase_ }) {
      const newTodoRef = getCollection(firebase_).doc(); // getting the new document id from firestore
      const newData = {
        done: false,
        message,
        createdTime: firebase_.firestore.Timestamp.fromDate(new Date()),
        modifiedTime: firebase_.firestore.Timestamp.fromDate(new Date())
      };
      updateListWithCache(todoList.concat([{ id: newTodoRef.id, ...newData }]));
      newTodoRef.set(newData); // create new document in firestore collection
    }
  };
  const updateTodoCompletion = (id, done) => {
    startFetching();
    getRegistedFirebase()
      .then(_updateTodoCompletion)
      .then(() => setIsLoading(false))
      .catch(handleError);
    function _updateTodoCompletion({ firebase_ }) {
      const newData = {
        done,
        modifiedTime: firebase_.firestore.FieldValue.serverTimestamp()
      };
      updateListWithCache(
        todoList.map(i => (i.id === id ? { ...i, ...newData } : i))
      );
      getCollection(firebase_)
        .doc(id)
        .update(newData);
    }
  };
  const removeTodo = id => {
    startFetching();
    getRegistedFirebase()
      .then(_removeTodo)
      .then(() => setIsLoading(false))
      .catch(handleError);
    function _removeTodo({ firebase_ }) {
      updateListWithCache(todoList.filter(i => i.id !== id));
      getCollection(firebase_)
        .doc(id)
        .delete();
    }
  };
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
    cacheList = [];
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
