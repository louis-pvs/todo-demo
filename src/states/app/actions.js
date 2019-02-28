export const IS_LOADING = "IS_LOADING";
export const NOT_LOADING = "NOT_LOADING";
export const IS_ERROR = "IS_ERROR";
export const NOT_ERROR = "NOT_ERROR";
export const DEFAULT_ERR =
  "Something went wrong on our side, so sorry please try again.";

export const startLoading = () => ({
  type: IS_LOADING
});
export const stopLoading = () => ({
  type: NOT_LOADING
});
export const showError = (err = DEFAULT_ERR) => ({
  type: IS_ERROR,
  payload: err
});
export const hideError = () => ({
  type: NOT_ERROR
});
