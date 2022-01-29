export default (callback, wait) => {
  let timeout;

  return function (...args) {
    const self = this;
    const later = () => {
      clearTimeout(timeout);
      callback.call(self, ...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
