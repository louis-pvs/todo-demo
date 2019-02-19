/**
 * effects function storing list into localStorage
 * @param {[{}]} list - to-do list
 */
export function storeTodoList(list) {
  const jsonList = JSON.stringify(list);
  window.localStorage.setItem("to-do", jsonList);
}

/**
 * effects function retrieve list from localStorage
 * @returns to-do list
 */
export function getTodoList() {
  let list = window.localStorage.getItem("to-do");
  list = JSON.parse(list);
  return list;
}
