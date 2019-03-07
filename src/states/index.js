import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import todoReducer from "./todo/reducer";
import appReducer from "./app/reducer";
import {
  addTodoEpics,
  getTodoEpics,
  removeTodoEpics,
  storeTodoEpics,
  todoCompletionEpics
} from "./todo/epics";
import {
  hideErrorEpics,
  startLoadingEpics,
  stopLoadingEpics
} from "./app/epics";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ app: appReducer, todo: todoReducer });
const rootEpic = combineEpics(
  addTodoEpics,
  getTodoEpics,
  hideErrorEpics,
  removeTodoEpics,
  startLoadingEpics,
  stopLoadingEpics,
  storeTodoEpics,
  todoCompletionEpics
);
/**
 * configureStore
 * @returns redux store
 **/
export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
