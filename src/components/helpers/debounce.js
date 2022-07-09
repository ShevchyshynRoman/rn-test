export const debounce = (f, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
