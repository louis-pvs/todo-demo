import { interval } from "rxjs";
import { ofType } from "redux-observable";
import { map, distinctUntilChanged, throttle, delay } from "rxjs/operators";

import {
  ADD_TODO,
  GET_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_COMPLETION,
  UPDATE_TODO
} from "../todo/actions";

import {
  IS_ERROR,
  IS_LOADING,
  hideError,
  startLoading,
  stopLoading
} from "./actions";

export const startLoadingEpics = action$ => {
  return action$.pipe(
    ofType(GET_TODO, ADD_TODO, TOGGLE_TODO_COMPLETION, REMOVE_TODO),
    distinctUntilChanged(),
    throttle(() => interval(600)),
    map(startLoading)
  );
};

export const stopLoadingEpics = action$ => {
  return action$.pipe(
    ofType(UPDATE_TODO, IS_ERROR),
    distinctUntilChanged(),
    throttle(() => interval(600)),
    delay(600),
    map(stopLoading)
  );
};

export const hideErrorEpics = action$ => {
  return action$.pipe(
    ofType(IS_LOADING),
    distinctUntilChanged(),
    throttle(() => interval(600)),
    delay(600),
    map(hideError)
  );
};
