import { ofType } from "redux-observable";
import { from, throwError, of } from "rxjs";
import {
  filter,
  flatMap,
  ignoreElements,
  map,
  pluck,
  tap,
  withLatestFrom,
  catchError
} from "rxjs/operators";

import {
  GET_TODO,
  UPDATE_TODO,
  ADD_TODO,
  TOGGLE_TODO_COMPLETION,
  REMOVE_TODO,
  updateTodo
} from "./actions";
import { storeTodoList } from "../../services/localStorage";
import { lazyLoadFirebase } from "../../../utils/firebase";
import { showError } from "../app/actions";

export const getTodoEpics = action$ => {
  return action$.pipe(
    ofType(GET_TODO),
    flatMap(() => lazyLoadFirebase()),
    flatMap(({ err, app, rxfire }) => {
      if (err) return throwError(err);

      const todoRef = app.firebase_
        .firestore()
        .collection("todo")
        .orderBy("createdTime");
      return rxfire.collectionData(todoRef, "id"); // observing this collection changes
    }),
    map(updateTodo), // => emits action creator evertime the collection changed
    catchError(err => {
      return of(showError(err.message || err));
    })
  );
};
export const storeTodoEpics = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_TODO),
    withLatestFrom(state$),
    tap(([__, state]) => storeTodoList(state.todo)),
    ignoreElements()
  );
};

export const addTodoEpics = action$ => {
  return action$.pipe(
    ofType(ADD_TODO),
    withLatestFrom(lazyLoadFirebase()),
    flatMap(([action, { app, err }]) => {
      if (err) return throwError(err);
      const todoRef = app.firebase_.firestore().collection("todo");
      const newTodoRef = todoRef.doc();
      const newData = {
        done: false,
        message: action.payload,
        createdTime: app.firebase_.firestore.Timestamp.fromDate(new Date()),
        modifiedTime: app.firebase_.firestore.Timestamp.fromDate(new Date())
      };
      return newTodoRef.set(newData).catch(throwError);
    }),
    ignoreElements(),
    catchError(err => {
      return of(showError(err.message || err));
    })
  );
};

export const todoCompletionEpics = (action$, state$) => {
  return action$.pipe(
    // take all action$
    ofType(TOGGLE_TODO_COMPLETION), // observe only when types is TOGGLE_TODO_COMPLETION
    withLatestFrom(state$.pipe(pluck("todo"))), // observe only `todo` in state$ along with latest observable
    flatMap(([action, todoState]) => {
      // emit both observable
      return from(todoState).pipe(filter(todo => todo.id === action.payload)); // return another observable
    }),
    withLatestFrom(lazyLoadFirebase()), // lazy load firebase
    flatMap(([selectedTodo, { app, err }]) => {
      if (err) return throwError(err);
      const todoRef = app.firebase_.firestore().collection("todo");
      return todoRef
        .doc(selectedTodo.id)
        .update({
          done: !selectedTodo.done,
          modifiedTime: app.firebase_.firestore.FieldValue.serverTimestamp()
        })
        .catch(throwError);
    }),
    ignoreElements(),
    catchError(err => {
      return of(showError(err.message || err));
    })
  );
};

export const removeTodoEpics = action$ => {
  return action$.pipe(
    ofType(REMOVE_TODO),
    withLatestFrom(lazyLoadFirebase()),
    flatMap(([action, { app, err }]) => {
      if (err) return throwError(err);
      const todoRef = app.firebase_.firestore().collection("todo");
      return todoRef
        .doc(action.payload)
        .delete()
        .catch(throwError);
    }),
    ignoreElements(),
    catchError(err => {
      return of(showError(err.message || err));
    })
  );
};
