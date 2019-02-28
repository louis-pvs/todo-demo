import { getTodoList } from "../../services/localStorage";
import { UPDATE_TODO } from "./actions";
const INITIAL_STATE = getTodoList() || [];

/**
 * todoReducer
 * @param {[{}]} state - initial state
 * @param {{type: string }} action - redux action
 * @returns todo states
 **/
export default function todoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_TODO:
      return action.payload;
    default:
      return state;
  }
}
