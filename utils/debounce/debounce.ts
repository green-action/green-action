export const debounce = (callback: () => void, delay: number) => {
  type timerId = ReturnType<typeof setTimeout> | null;
  let timerId: timerId = null;
  return (...args: []) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
