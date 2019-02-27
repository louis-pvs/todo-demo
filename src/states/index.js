import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";

import todoReducer from "./todo";
import appReducer from "./app";

const epicMiddleWware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ app: appReducer, todo: todoReducer });

/**
 * configureStore
 * @returns redux store
 **/
export default function configureStore() {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleWware))
  );
}
