import { IS_LOADING, NOT_LOADING, IS_ERROR, NOT_ERROR } from "./actions";

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  err: ""
};

/**
 * appReducer
 * @param {[{}]} state - initial state
 * @param {{type: string }} action - redux action
 * @returns app states
 **/
export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case NOT_LOADING:
      return { ...state, isLoading: false };
    case IS_ERROR:
      return { ...state, isError: true, err: action.payload };
    case NOT_ERROR:
      return { ...state, isError: false, err: INITIAL_STATE.err };
    default:
      return state;
  }
}
