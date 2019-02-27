import { getTodoList } from "../services/localStorage";

const INITIAL_STATE = getTodoList() || [];

/**
 * todoReducer
 * @param {[{}]} state - initial state
 * @param {{type: string }} action - redux action
 * @returns todo states
 **/
export default function todoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
