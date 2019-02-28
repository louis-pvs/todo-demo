import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createEpicMiddleware } from "redux-observable";

import todoReducer from "./todo/reducer";
import appReducer from "./app/reducer";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ app: appReducer, todo: todoReducer });

/**
 * configureStore
 * @returns redux store
 **/
export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  // epicMiddleware.run(rootEpic);

  return store;
}
