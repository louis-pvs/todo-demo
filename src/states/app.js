const INITIAL_STATE = {
  isLoading: false,
  isError: false
};

/**
 * appReducer
 * @param {[{}]} state - initial state
 * @param {{type: string }} action - redux action
 * @returns app states
 **/
export default function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
