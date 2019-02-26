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
    getRegistedFirebase().then(_addTodo);
    function _addTodo(db) {
      const newTodoRef = getCollection(db).doc(); // getting the new document id from firestore
      const newData = {
        done: false,
        message,
        createdTime: db.firestore.Timestamp.fromDate(new Date()),
        modifiedTime: db.firestore.Timestamp.fromDate(new Date())
      };
      updateListWithCache(todoList.concat([{ id: newTodoRef.id, ...newData }]));
      newTodoRef
        .set(newData) // create new document in firestore collection
        .then(() => setIsLoading(false))
        .catch(handleError);
    }
  };
  const updateTodoCompletion = (id, done) => {
    startFetching();
    getRegistedFirebase().then(_updateTodoCompletion);
    function _updateTodoCompletion(db) {
      const newData = {
        done,
        modifiedTime: db.firestore.FieldValue.serverTimestamp()
      };
      updateListWithCache(
        todoList.map(i => (i.id === id ? { ...i, ...newData } : i))
      );
      getCollection(db)
        .doc(id)
        .update(newData)
        .then(() => setIsLoading(false))
        .catch(handleError);
    }
  };
  const removeTodo = id => {
    startFetching();
    getRegistedFirebase().then(_removeTodo);
    function _removeTodo(db) {
      updateListWithCache(todoList.filter(i => i.id !== id));
      getCollection(db)
        .doc(id)
        .delete()
        .then(() => setIsLoading(false))
        .catch(handleError);
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
