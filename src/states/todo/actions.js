export const GET_TODO = "GET_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO_COMPLETION = "TOGGLE_TODO_COMPLETION";

export const getTodo = () => ({ type: GET_TODO });

export const updateTodo = newTodoList => ({
  type: UPDATE_TODO,
  payload: newTodoList
});

export const addTodo = message => ({
  type: ADD_TODO,
  payload: message
});

export const toggleTodoCompletion = id => ({
  type: TOGGLE_TODO_COMPLETION,
  payload: id
});

export const removeTodo = id => ({ type: REMOVE_TODO, payload: id });
