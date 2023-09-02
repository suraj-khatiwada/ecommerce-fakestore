/**
 * Get values from local storage
 * @param {string} key
 */
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

/**
 * Set values to local storage
 * @param {string} key
 * @param {*} value
 *
 */
export const setLocalStorage = (key, value) => {
  if (typeof value === "string") {
    return localStorage.setItem(key, value);
  } else {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};
